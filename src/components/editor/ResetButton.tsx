import { Button } from "@/components/ui/Button";
import { RotateCcw } from "lucide-react";

export function ResetButton({ onReset }: { onReset: () => void }) {
  function handleClick() {
    if (window.confirm("Apagar o perfil e voltar ao exemplo? Isso não pode ser desfeito.")) {
      onReset();
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      <RotateCcw /> Recomeçar
    </Button>
  );
}
