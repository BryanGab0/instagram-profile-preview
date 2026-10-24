import { Link } from "lucide-react";
import type { Profile } from "@/types/profile";
import { Avatar } from "./Avatar";
import { splitBio } from "./bio";
import type { PreviewStrings } from "./strings";

interface ProfileHeaderProps {
  profile: Profile;
  strings: PreviewStrings;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[17px] leading-5 font-semibold">{value || "0"}</span>
      <span className="text-[15px] leading-[18px]">{label}</span>
    </div>
  );
}

export function ProfileHeader({ profile, strings }: ProfileHeaderProps) {
  return (
    <div className="px-4 pt-2.5">
      <div className="flex items-center gap-5">
        <Avatar src={profile.avatar} hasStory={profile.hasStory} />
        <div className="min-w-0">
          <p className="truncate text-[15px] leading-5 font-semibold">{profile.displayName}</p>
          <div className="mt-2 flex gap-[38px]">
            <Stat value={profile.postsCount} label={strings.posts} />
            <Stat value={profile.followersCount} label={strings.followers} />
            <Stat value={profile.followingCount} label={strings.following} />
          </div>
        </div>
      </div>

      {profile.bio && (
        <p className="mt-3 text-[15px] leading-5 break-words whitespace-pre-line">
          {splitBio(profile.bio).map((part, index) =>
            part.isMention ? (
              <span key={index} className="text-ig-mention">
                {part.text}
              </span>
            ) : (
              part.text
            ),
          )}
        </p>
      )}

      {profile.website && (
        <p className="mt-1 flex items-center gap-1.5 text-[15px] leading-5 font-semibold">
          <Link className="size-[18px] shrink-0" strokeWidth={2.25} />
          <span className="truncate">{profile.website}</span>
        </p>
      )}
    </div>
  );
}
