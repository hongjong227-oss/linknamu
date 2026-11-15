import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

// wireframe.png 구성: 상단 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 세로 배치
export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-7 pt-16 pb-16 sm:pt-24">
      {/* 배경 장식: 흐릿한 살구·복숭아색 빛 번짐. 글래스 카드 뒤로 은은하게 비침 */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-20 size-80 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="absolute top-1/2 -right-24 size-96 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 size-80 rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      <div className="flex w-full max-w-[400px] flex-col">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

        <ul className="mt-11 flex flex-col gap-4">
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
