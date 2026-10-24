import { Label } from "@/components/ui/Label";
import { useId, type ReactNode } from "react";

interface FieldProps {
  label: string;
  hint?: string;
  /** Receives the id to put on the control, so the label points to it. */
  children: (id: string) => ReactNode;
}

export function Field({ label, hint, children }: FieldProps) {
  const id = useId();

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children(id)}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
