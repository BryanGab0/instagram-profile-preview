import type { ProfileActions } from "@/hooks/useProfile";
import type { Profile } from "@/types/profile";
import { ProfileSection } from "./ProfileSection";

interface EditPanelProps {
  profile: Profile;
  actions: ProfileActions;
}

export function EditPanel({ profile, actions }: EditPanelProps) {
  return (
    <div className="mt-6 space-y-6">
      <ProfileSection profile={profile} setField={actions.setField} />
    </div>
  );
}
