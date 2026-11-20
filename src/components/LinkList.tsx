"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

function trackClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // sendBeacon은 새 탭으로 이동해도 요청이 끝까지 전송됨
  if (!navigator.sendBeacon?.("/api/click", body)) {
    fetch("/api/click", { method: "POST", body, keepalive: true }).catch(() => {});
  }
}

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Counts>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옴
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/click", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? (res.json() as Promise<Counts>) : null))
      .then((data) => {
        if (!data) return;
        // 응답이 오기 전에 누른 클릭(+1)이 사라지지 않도록, 더 큰 값을 유지
        setCounts((prev) => {
          const next = { ...data };
          for (const id in prev) next[id] = Math.max(next[id] ?? 0, prev[id]);
          return next;
        });
      })
      .catch(() => {}); // 실패하면 0회 그대로 둠
    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    trackClick(id);
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="mt-11 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
