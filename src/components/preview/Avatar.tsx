import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string | null;
  hasStory: boolean;
}

export function Avatar({ src, hasStory }: AvatarProps) {
  return (
    <div className="relative size-[84px] shrink-0">
      {hasStory && <div className="absolute -inset-1.5 rounded-full ig-story-ring" />}
      <div
        className={cn(
          "relative size-full overflow-hidden rounded-full bg-ig-button",
          hasStory && "ring-[3px] ring-ig-background",
        )}
      >
        {src && <img src={src} alt="" className="size-full object-cover" />}
      </div>
    </div>
  );
}
