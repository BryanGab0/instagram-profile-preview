import { EditPanel } from "@/components/editor/EditPanel";
import { FitToScreen } from "@/components/layout/FitToScreen";
import { Header } from "@/components/layout/Header";
import { PreviewControls } from "@/components/layout/PreviewControls";
import { PHONE_HEIGHT, PHONE_WIDTH } from "@/components/preview/dimensions";
import { PhoneFrame } from "@/components/preview/PhoneFrame";
import { ProfilePreview } from "@/components/preview/ProfilePreview";
import type { PreviewLocale, PreviewTheme } from "@/components/preview/types";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";

// Header (64px), page padding (2 × 32px) and the preview controls above the phone (48px).
const RESERVED_HEIGHT = 176;

export function Home() {
  const { profile, actions } = useProfile();
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>("light");
  const [previewLocale, setPreviewLocale] = useState<PreviewLocale>("pt-BR");

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <section
          aria-labelledby="editor-title"
          className="order-2 rounded-2xl border bg-card p-6 shadow-sm lg:order-1"
        >
          <h2 id="editor-title" className="text-xl font-bold">
            Editar perfil
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            As mudanças aparecem no celular enquanto você edita.
          </p>
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
