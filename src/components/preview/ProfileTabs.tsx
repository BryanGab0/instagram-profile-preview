import { SquarePlay, SquareUserRound } from "lucide-react";
import { GridIcon } from "./TabIcons";

export function ProfileTabs() {
  return (
    <div className="mt-3 flex">
      <div className="relative flex h-11 flex-1 items-center justify-center">
        <GridIcon className="size-6" />
        <span className="absolute bottom-0 h-[1.5px] w-[62px] bg-ig-text" />
      </div>
      <div className="flex h-11 flex-1 items-center justify-center text-ig-text/80">
        <SquarePlay className="size-[26px]" strokeWidth={1.75} />
      </div>
      <div className="flex h-11 flex-1 items-center justify-center text-ig-text/80">
        <SquareUserRound className="size-[26px]" strokeWidth={1.75} />
      </div>
    </div>
  );
}
