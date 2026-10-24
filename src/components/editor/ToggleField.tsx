import { useId } from "react";
import { Label } from "@/components/ui/Label";
import { Switch } from "@/components/ui/Switch";

interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ToggleField({ label, checked, onCheckedChange }: ToggleFieldProps) {
  const id = useId();

  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
