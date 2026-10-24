import { ImageIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { ProfileActions } from "@/hooks/useProfile";
import type { Highlight } from "@/types/profile";
import { ImagePicker } from "./ImagePicker";
import { Section } from "./Section";

const HIGHLIGHT_NAME_MAX_LENGTH = 15;

interface HighlightsSectionProps {
  highlights: Highlight[];
  actions: Pick<ProfileActions, "addHighlight" | "updateHighlight" | "removeHighlight">;
}

export function HighlightsSection({ highlights, actions }: HighlightsSectionProps) {
  return (
    <Section
      title="Destaques"
      action={
        <Button variant="outline" size="sm" onClick={() => actions.addHighlight("Destaque")}>
          <Plus /> Adicionar
        </Button>
      }
    >
      {highlights.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Sem destaques. No Instagram, a fileira de destaques some quando não há nenhum.
        </p>
      ) : (
        <ul className="space-y-2">
          {highlights.map((highlight) => (
            <li key={highlight.id} className="flex items-center gap-2">
              <ImagePicker onPick={([image]) => actions.updateHighlight(highlight.id, { image })}>
                {(open) => (
                  <button
                    type="button"
                    onClick={open}
                    aria-label={`Escolher capa de ${highlight.name || "destaque"}`}
                    className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-secondary outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {highlight.image ? (
                      <img src={highlight.image} alt="" className="size-full object-cover" />
                    ) : (
                      <ImageIcon className="size-4 text-muted-foreground" />
                    )}
                  </button>
                )}
              </ImagePicker>
              <Input
                value={highlight.name}
                onChange={(event) =>
                  actions.updateHighlight(highlight.id, { name: event.target.value })
                }
                maxLength={HIGHLIGHT_NAME_MAX_LENGTH}
                aria-label="Nome do destaque"
                placeholder="Nome"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => actions.removeHighlight(highlight.id)}
                aria-label={`Remover ${highlight.name || "destaque"}`}
              >
                <X />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
