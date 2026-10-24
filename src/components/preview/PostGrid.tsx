import type { Post } from "@/types/profile";
import { Camera } from "lucide-react";
import type { PreviewStrings } from "./strings";

interface PostGridProps {
  posts: Post[];
  strings: PreviewStrings;
}

export function PostGrid({ posts, strings }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-[18px] px-6 text-center">
        <div className="flex size-[85px] items-center justify-center rounded-full border-[1.5px] border-ig-text">
          <Camera className="size-[54px]" strokeWidth={1} />
        </div>
        <p className="text-2xl font-bold">{strings.noPosts}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-[1.5px]">
      {posts.map((post) => (
        <div key={post.id} className="aspect-[3/4] overflow-hidden bg-ig-button">
          <img src={post.image} alt="" className="size-full object-cover" />
        </div>
      ))}
    </div>
  );
}
