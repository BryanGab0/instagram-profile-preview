import { UserPlus } from "lucide-react";
import type { PreviewStrings } from "./strings";

export function ProfileActions({ strings }: { strings: PreviewStrings }) {
  const button = "flex h-8 items-center justify-center rounded-lg text-[15px] font-semibold";

  return (
    <div className="mt-3 flex gap-[5px] px-4">
      <span className={`${button} flex-1 bg-ig-blue text-white`}>{strings.follow}</span>
      <span className={`${button} flex-1 bg-ig-button`}>{strings.message}</span>
      <span className={`${button} w-8 bg-ig-button`}>
        <UserPlus className="size-4" strokeWidth={2.25} />
      </span>
    </div>
  );
}
