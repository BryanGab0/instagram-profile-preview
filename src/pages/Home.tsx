import { EditPanel } from "@/components/editor/EditPanel";
import { FitToScreen } from "@/components/layout/FitToScreen";
import { Header } from "@/components/layout/Header";
import { PreviewControls } from "@/components/layout/PreviewControls";
import { PHONE_HEIGHT, PHONE_WIDTH } from "@/components/preview/dimensions";
import { PhoneFrame } from "@/components/preview/PhoneFrame";
import { ProfilePreview } from "@/components/preview/ProfilePreview";
import type { PreviewLocale, PreviewTheme } from "@/components/preview/types";
import { usePersistentProfile } from "@/hooks/usePersistentProfile";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Header (64px), page padding (2 × 32px) and the preview controls above the phone (48px).
const RESERVED_HEIGHT = 176;

export function Home() {
  const { profile, actions, isLoaded, saveFailed } = usePersistentProfile();
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>("light");
  const [previewLocale, setPreviewLocale] = useState<PreviewLocale>("pt-BR");

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hidden until the saved profile loads, so the default one doesn't flash first. */}
      <main
        className={cn(
          "mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start",
          !isLoaded && "invisible",
        )}
      >
        <section
          aria-labelledby="editor-title"
          className="order-2 rounded-2xl border bg-card p-6 shadow-sm lg:order-1"
        >
          <h2 id="editor-title" className="text-xl font-bold">
            Editar perfil
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            As mudanças aparecem no celular enquanto você edita e ficam salvas neste navegador.
          </p>
          {saveFailed && (
            <p
              role="alert"
              className="mt-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              Não foi possível salvar. O armazenamento do navegador pode estar cheio; remova algumas
              imagens e tente de novo.
            </p>
          )}
          <EditPanel profile={profile} actions={actions} />
        </section>

        <aside
          aria-label="Pré-visualização"
          className="order-1 flex flex-col items-center gap-4 lg:sticky lg:top-24 lg:order-2"
        >
          <PreviewControls
            theme={previewTheme}
            onThemeChange={setPreviewTheme}
            locale={previewLocale}
            onLocaleChange={setPreviewLocale}
          />
          <FitToScreen width={PHONE_WIDTH} height={PHONE_HEIGHT} reservedHeight={RESERVED_HEIGHT}>
            <PhoneFrame theme={previewTheme}>
              <ProfilePreview profile={profile} locale={previewLocale} />
            </PhoneFrame>
          </FitToScreen>
        </aside>
      </main>
    </div>
  );
}
