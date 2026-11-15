export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 아래 이미지 경로(예: "/profile.jpg") 또는 next.config.ts에 허용된 외부 URL. 없으면 이름 첫 글자로 대체 */
  image?: string;
  links: LinkItem[];
};

// TODO: 보여주기용 더미 값. 실제 프로필·사진·링크 주소로 교체할 것
export const profile: Profile = {
  name: "육육대디",
  // \n 위치에서 줄바꿈됨 (ProfileHeader의 whitespace-pre-line)
  bio: "육육대디 | 육아 휴직하고 육아하는 아빠\n-세상에 육아 하는 모든 아빠는 대단하다-",
  image: "/profile.jpeg",
  links: [
    { id: "instagram", title: "인스타그램", url: "https://www.instagram.com/" },
    { id: "blog", title: "🧸 블로그", url: "https://blog.naver.com/fhjk3537" },
  ],
};
