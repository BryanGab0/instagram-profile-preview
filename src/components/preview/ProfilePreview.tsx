import type { Profile } from "@/types/profile";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTopBar } from "./ProfileTopBar";
import { PREVIEW_STRINGS } from "./strings";
import type { PreviewLocale } from "./types";

interface ProfilePreviewProps {
  profile: Profile;
  locale: PreviewLocale;
}

/** Read-only replica of an Instagram profile as seen by a visitor on iOS. */
export function ProfilePreview({ profile, locale }: ProfilePreviewProps) {
  const strings = PREVIEW_STRINGS[locale];

  return (
    <div className="flex min-h-full flex-col">
      <ProfileTopBar username={profile.username} isVerified={profile.isVerified} />
      <ProfileHeader profile={profile} strings={strings} />
    </div>
  );
}
