import type { PreviewLocale, PreviewTheme } from "@/components/preview/types";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Moon, Sun } from "lucide-react";

interface PreviewControlsProps {
  theme: PreviewTheme;
  onThemeChange: (theme: PreviewTheme) => void;
  locale: PreviewLocale;
  onLocaleChange: (locale: PreviewLocale) => void;
}

export function PreviewControls({
  theme,
  onThemeChange,
  locale,
  onLocaleChange,
}: PreviewControlsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <SegmentedControl
        label="Tema do Instagram"
        value={theme}
        onChange={onThemeChange}
        options={[
          {
            value: "light",
            label: (
              <>
                <Sun /> Claro
              </>
            ),
          },
          {
            value: "dark",
            label: (
              <>
                <Moon /> Escuro
              </>
            ),
          },
        ]}
      />
      <SegmentedControl
        label="Idioma do Instagram"
        value={locale}
        onChange={onLocaleChange}
        options={[
          { value: "pt-BR", label: "Português" },
          { value: "en", label: "English" },
        ]}
      />
    </div>
  );
}
