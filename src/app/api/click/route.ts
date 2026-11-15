import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

const linkIds = new Set(profile.links.map((link) => link.id));

// 링크 클릭 1회 기록. 본문: { "linkId": "instagram" }
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = JSON.parse(await request.text()));
  } catch {
    return Response.json({ error: "잘못된 요청 본문" }, { status: 400 });
  }
  if (typeof linkId !== "string" || !linkIds.has(linkId)) {
    return Response.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    await clicks.updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("클릭 수 저장 실패", error);
    return Response.json({ error: "클릭 수 저장 실패" }, { status: 500 });
  }
}

// 링크별 클릭 수 조회
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: [...linkIds] } }).toArray();
    const counts = Object.fromEntries(profile.links.map((link) => [link.id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;
    return Response.json(counts);
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return Response.json({ error: "클릭 수 조회 실패" }, { status: 500 });
  }
}
