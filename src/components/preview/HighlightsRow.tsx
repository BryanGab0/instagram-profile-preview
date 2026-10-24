import type { Highlight } from "@/types/profile";

export function HighlightsRow({ highlights }: { highlights: Highlight[] }) {
  if (highlights.length === 0) return null;

  return (
    <div className="mt-[18px] scrollbar-none flex gap-4 overflow-x-auto px-3">
      {highlights.map((highlight) => (
        <div key={highlight.id} className="flex w-[62px] shrink-0 flex-col items-center gap-0.5">
          <div className="rounded-full bg-ig-highlight-ring p-[3px]">
            <div className="rounded-full bg-ig-background p-[3px]">
              <div className="size-[50px] overflow-hidden rounded-full bg-ig-button">
                {highlight.image && (
                  <img src={highlight.image} alt="" className="size-full object-cover" />
                )}
              </div>
            </div>
          </div>
          <span className="w-full truncate text-center text-xs leading-4">{highlight.name}</span>
        </div>
      ))}
    </div>
  );
}
