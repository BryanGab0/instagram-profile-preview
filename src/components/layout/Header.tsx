import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <div className="flex size-9 items-center justify-center rounded-xl instagram-gradient text-white">
          <Logo className="size-5" />
        </div>
        <div>
          <h1 className="leading-tight font-bold">InstaPreview</h1>
          <p className="text-xs text-muted-foreground">Veja o perfil antes de publicar</p>
        </div>
      </div>
    </header>
  );
}
