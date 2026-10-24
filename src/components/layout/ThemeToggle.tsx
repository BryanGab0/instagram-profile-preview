import { Button } from "@/components/ui/Button";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "dark" ? "Usar tema claro" : "Usar tema escuro";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="rounded-full [&_svg]:size-5"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
