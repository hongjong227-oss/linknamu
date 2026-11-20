"use client";

type LinkCardProps = {
  title: string;
  url: string;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      // 글래스모피즘: 반투명 흰 배경 + 배경 블러 + 밝은 테두리. 호버는 살짝 밝아지고 1px만 뜸
      className="relative block w-full rounded-3xl border border-white/70 bg-white/45 px-16 py-[18px] text-center text-[15px] font-semibold text-stone-800 shadow-[0_4px_20px_-6px_rgba(160,90,50,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_24px_-8px_rgba(160,90,50,0.25)] active:translate-y-0 active:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
    >
      {title}
      {/* 제목이 가운데 정렬을 유지하도록 클릭 수는 오른쪽에 겹쳐 배치 (px-16으로 겹침 방지) */}
      <span className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-medium tabular-nums text-stone-400">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
