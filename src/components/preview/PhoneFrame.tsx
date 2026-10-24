import type { ReactNode } from "react";
import { StatusBar } from "./StatusBar";
import type { PreviewTheme } from "./types";

interface PhoneFrameProps {
  theme: PreviewTheme;
  children: ReactNode;
}

// Screen size matches a 6.1" iPhone (390 × 844 pt), so 1 CSS pixel equals 1 iOS point.
export function PhoneFrame({ theme, children }: PhoneFrameProps) {
  return (
    <div className="h-fit w-fit rounded-[60px] bg-neutral-950 p-3 shadow-2xl ring-1 ring-neutral-700">
      <div
        data-theme={theme}
        className="ig-preview relative h-[844px] w-[390px] overflow-hidden rounded-[48px] bg-ig-background font-ig text-ig-text"
      >
        <div
          className="absolute top-[11px] left-1/2 z-30 h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black"
          aria-hidden
        />
        <StatusBar />
        <div className="absolute inset-0 scrollbar-none overflow-y-auto pt-[54px]">{children}</div>
      </div>
    </div>
  );
}
