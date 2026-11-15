import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

// wireframe.png 구성: 상단 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 세로 배치
export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-zinc-50 px-6 pt-20 pb-14">
      <div className="flex w-full max-w-sm flex-col">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

        <ul className="mt-12 flex flex-col gap-5">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard id={link.id} title={link.title} url={link.url} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
