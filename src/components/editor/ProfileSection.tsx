import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ProfileActions } from "@/hooks/useProfile";
import { sanitizeUsername } from "@/lib/username";
import type { Profile } from "@/types/profile";
import { Camera, X } from "lucide-react";
import { Field } from "./Field";
import { ImagePicker } from "./ImagePicker";
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
      <ImagePicker onPick={([image]) => setField("avatar", image)}>
        {(open) => (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={open}
              aria-label="Escolher foto de perfil"
              className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-secondary transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
            >
              {profile.avatar ? (
                <img src={profile.avatar} alt="" className="size-full object-cover" />
              ) : (
                <Camera className="size-6 text-muted-foreground" />
              )}
            </button>
            <Button variant="outline" size="sm" onClick={open}>
              {profile.avatar ? "Trocar foto" : "Escolher foto"}
            </Button>
            {profile.avatar && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setField("avatar", null)}
                aria-label="Remover foto de perfil"
              >
                <X />
              </Button>
            )}
          </div>
        )}
      </ImagePicker>
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
