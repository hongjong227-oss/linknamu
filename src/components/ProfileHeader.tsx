import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  image?: string;
};

export default function ProfileHeader({ name, bio, image }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative size-32 overflow-hidden rounded-full bg-emerald-100 ring-4 ring-white shadow-md">
        {image ? (
          <Image src={image} alt={`${name} 프로필 사진`} fill sizes="128px" className="object-cover" priority />
        ) : (
          <span className="flex size-full items-center justify-center text-3xl font-bold text-emerald-700">
            {name.charAt(0)}
          </span>
        )}
      </div>
      <h1 className="mt-5 text-xl font-bold text-zinc-900 sm:text-2xl">{name}</h1>
      <p className="mt-2 text-sm text-zinc-600 sm:text-base">{bio}</p>
    </header>
  );
}
