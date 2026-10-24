import { ChevronLeft, Ellipsis } from "lucide-react";
import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileTopBarProps {
  username: string;
  isVerified: boolean;
}

export function ProfileTopBar({ username, isVerified }: ProfileTopBarProps) {
  return (
    <div className="flex h-[60px] items-center gap-5 pr-6 pl-[22px]">
      <ChevronLeft className="size-7 shrink-0" strokeWidth={2} />
      <div className="flex min-w-0 flex-1 items-center gap-1">
        <span className="truncate text-[21px] font-bold tracking-tight">{username}</span>
        {isVerified && <VerifiedBadge className="size-[18px]" />}
      </div>
      <Ellipsis className="size-6 shrink-0" strokeWidth={2} />
    </div>
  );
}
