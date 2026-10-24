import { Input } from "@/components/ui/Input";
import type { ProfileActions } from "@/hooks/useProfile";
import type { Profile } from "@/types/profile";
import { Field } from "./Field";
import { Section } from "./Section";

const STATS = [
  { field: "postsCount", label: "Posts" },
  { field: "followersCount", label: "Seguidores" },
  { field: "followingCount", label: "Seguindo" },
] as const;

interface StatsSectionProps {
  profile: Profile;
  setField: ProfileActions["setField"];
}

export function StatsSection({ profile, setField }: StatsSectionProps) {
  return (
    <Section title="Números">
      <div className="grid grid-cols-3 gap-3">
        {STATS.map(({ field, label }) => (
          <Field key={field} label={label}>
            {(id) => (
              <Input
                id={id}
                value={profile[field]}
                onChange={(event) => setField(field, event.target.value)}
                placeholder="0"
              />
            )}
          </Field>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Escreva como o Instagram mostra, por exemplo 1.234, 12,5 mil ou 1,2 mi.
      </p>
    </Section>
  );
}
