import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  image?: string;
};

export default function ProfileHeader({ name, bio, image }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 따뜻한 톤의 부드러운 그림자로 살짝 떠 있는 느낌 */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_12px_32px_-8px_rgba(160,90,50,0.35),0_2px_6px_rgba(160,90,50,0.08)] ring-1 ring-white/80">
        <div className="relative size-32 overflow-hidden rounded-full bg-white shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
          {image ? (
            // object-contain으로 자르지 않고 전체를 담고, 여백(p-[13px])을 줘서
            // 세로형(3:4) 사진의 네 모서리까지 원 안에 들어오게 함
            <Image
              src={image}
              alt={`${name} 프로필 사진`}
              fill
              sizes="128px"
              className="object-contain p-[13px]"
              priority
            />
          ) : (
            <span className="flex size-full items-center justify-center bg-orange-50 text-3xl font-bold text-orange-700">
              {name.charAt(0)}
            </span>
          )}
        </div>
      </div>
      <h1 className="mt-6 text-[22px] font-bold tracking-tight text-stone-900">{name}</h1>
      <p className="mt-2.5 whitespace-pre-line text-[14.5px] leading-relaxed text-stone-500">{bio}</p>
    </header>
  );
}
