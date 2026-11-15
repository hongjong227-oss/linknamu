"use client";

type LinkCardProps = {
  id: string;
  title: string;
  url: string;
};

function trackClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // sendBeacon은 페이지를 떠나도 요청이 끝까지 전송됨
  if (!navigator.sendBeacon?.("/api/click", body)) {
    fetch("/api/click", { method: "POST", body, keepalive: true }).catch(() => {});
  }
}

export default function LinkCard({ id, title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick(id)}
      // 글래스모피즘: 반투명 흰 배경 + 배경 블러 + 밝은 테두리. 호버는 살짝 밝아지고 1px만 뜸
      className="block w-full rounded-3xl border border-white/70 bg-white/45 px-6 py-[18px] text-center text-[15px] font-semibold text-stone-800 shadow-[0_4px_20px_-6px_rgba(160,90,50,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_24px_-8px_rgba(160,90,50,0.25)] active:translate-y-0 active:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
    >
      {title}
    </a>
  );
}
