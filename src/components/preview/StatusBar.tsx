import { Wifi } from "lucide-react";
import { BatteryIcon, SignalIcon } from "./StatusBarIcons";

export function StatusBar() {
  return (
    <div
      className="absolute inset-x-0 top-0 z-20 grid h-[54px] grid-cols-[1fr_126px_1fr] items-center bg-ig-background pt-1.5"
      aria-hidden
    >
      <span className="text-center text-[17px] font-semibold">9:41</span>
      <span />
      <div className="flex items-center justify-center gap-1.5">
        <SignalIcon />
        <Wifi className="size-[17px]" strokeWidth={2.75} />
        <BatteryIcon />
      </div>
    </div>
  );
}
