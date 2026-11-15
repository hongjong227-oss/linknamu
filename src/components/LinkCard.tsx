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
      className="block w-full rounded-2xl border border-zinc-200 bg-white px-5 py-5 text-center font-medium text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
    >
      {title}
    </a>
  );
}
