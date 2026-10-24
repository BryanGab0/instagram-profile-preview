import { useEffect, useState, type ReactNode } from "react";

interface FitToScreenProps {
  width: number;
  height: number;
  /** Vertical space taken by the rest of the page, such as the header. */
  reservedHeight: number;
  children: ReactNode;
}

const MIN_SCALE = 0.6;
const HORIZONTAL_MARGIN = 32;

function computeScale(width: number, height: number, reservedHeight: number) {
  const byHeight = (window.innerHeight - reservedHeight) / height;
  const byWidth = (document.documentElement.clientWidth - HORIZONTAL_MARGIN) / width;
  return Math.max(MIN_SCALE, Math.min(1, byHeight, byWidth));
}

/** Shrinks fixed-size content so it fits the window. It never enlarges it. */
export function FitToScreen({ width, height, reservedHeight, children }: FitToScreenProps) {
  const [scale, setScale] = useState(() => computeScale(width, height, reservedHeight));

  useEffect(() => {
    const update = () => setScale(computeScale(width, height, reservedHeight));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width, height, reservedHeight]);

  return <div style={{ zoom: scale }}>{children}</div>;
}
