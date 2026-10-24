import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ProfileActions } from "@/hooks/useProfile";
import { sanitizeUsername } from "@/lib/username";
import type { Profile } from "@/types/profile";
import { Field } from "./Field";
import { Section } from "./Section";
import { ToggleField } from "./ToggleField";

const BIO_MAX_LENGTH = 150;

interface ProfileSectionProps {
  profile: Profile;
  setField: ProfileActions["setField"];
}

export function ProfileSection({ profile, setField }: ProfileSectionProps) {
  return (
    <Section title="Perfil">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome de usuário">
          {(id) => (
            <Input
              id={id}
              value={profile.username}
              onChange={(event) => setField("username", sanitizeUsername(event.target.value))}
              placeholder="seu.usuario"
              autoComplete="off"
              spellCheck={false}
            />
          )}
        </Field>

        <Field label="Nome">
          {(id) => (
            <Input
              id={id}
              value={profile.displayName}
              onChange={(event) => setField("displayName", event.target.value)}
              placeholder="Seu Nome"
            />
          )}
        </Field>
      </div>

      <Field label="Bio" hint={`${profile.bio.length}/${BIO_MAX_LENGTH}`}>
        {(id) => (
          <Textarea
            id={id}
            value={profile.bio}
            onChange={(event) => setField("bio", event.target.value)}
            maxLength={BIO_MAX_LENGTH}
            rows={4}
            placeholder="Conte sobre o perfil. Use @ para menções e # para hashtags."
          />
        )}
      </Field>

      <Field label="Link">
        {(id) => (
          <Input
            id={id}
            value={profile.website}
            onChange={(event) => setField("website", event.target.value)}
            placeholder="seusite.com"
            inputMode="url"
          />
        )}
      </Field>

      <ToggleField
        label="Selo de verificado"
        checked={profile.isVerified}
        onCheckedChange={(checked) => setField("isVerified", checked)}
      />
      <ToggleField
        label="Anel de story"
        checked={profile.hasStory}
        onCheckedChange={(checked) => setField("hasStory", checked)}
      />
    </Section>
  );
}
