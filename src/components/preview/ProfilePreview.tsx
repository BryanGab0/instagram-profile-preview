import type { Profile } from "@/types/profile";
import { HighlightsRow } from "./HighlightsRow";
import { PostGrid } from "./PostGrid";
import { ProfileActions } from "./ProfileActions";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";
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
      <ProfileActions strings={strings} />
      <HighlightsRow highlights={profile.highlights} />
      <ProfileTabs />
      <div className="flex flex-1 flex-col">
        <PostGrid posts={profile.posts} strings={strings} />
      </div>
    </div>
  );
}
