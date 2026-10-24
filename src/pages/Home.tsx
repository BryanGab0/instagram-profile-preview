import { FitToScreen } from "@/components/layout/FitToScreen";
import { EditPanel } from "@/components/editor/EditPanel";
import { Header } from "@/components/layout/Header";
import { PHONE_HEIGHT, PHONE_WIDTH } from "@/components/preview/dimensions";
import { PhoneFrame } from "@/components/preview/PhoneFrame";
import { ProfilePreview } from "@/components/preview/ProfilePreview";
import { useProfile } from "@/hooks/useProfile";

// Header (64px) plus the page's vertical padding (2 × 32px).
const RESERVED_HEIGHT = 128;

export function Home() {
  const { profile, actions } = useProfile();

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
          className="order-1 flex justify-center lg:sticky lg:top-24 lg:order-2"
        >
          <FitToScreen width={PHONE_WIDTH} height={PHONE_HEIGHT} reservedHeight={RESERVED_HEIGHT}>
            <PhoneFrame theme="light">
              <ProfilePreview profile={profile} locale="pt-BR" />
            </PhoneFrame>
          </FitToScreen>
        </aside>
      </main>
    </div>
  );
}
