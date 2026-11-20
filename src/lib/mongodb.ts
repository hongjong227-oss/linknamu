import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { mongoClient?: Promise<MongoClient> };

/** 개발 중 핫 리로드마다 연결이 새로 생기지 않도록 클라이언트를 전역에 캐시 */
export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인)");
  }
  globalForMongo.mongoClient ??= new MongoClient(uri).connect().catch((error) => {
    // 연결에 실패한 Promise가 계속 재사용되지 않도록 비워서 다음 요청 때 다시 시도
    globalForMongo.mongoClient = undefined;
    throw error;
  });
  return globalForMongo.mongoClient;
}

export async function getClicksCollection() {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB ?? "linknamu").collection<{ _id: string; count: number }>("clicks");
}
