import { isImageFile, loadImageFile } from "@/lib/image";
import { useState, type ChangeEvent, type ReactNode } from "react";

// Listing formats (instead of image/*) makes iPhones convert HEIC photos to JPEG on upload,
// since browsers can't display HEIC.
const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/gif";

interface ImagePickerProps {
  multiple?: boolean;
  onPick: (images: string[]) => void;
  /** Receives a function that opens the file dialog. */
  children: (open: () => void) => ReactNode;
}

export function ImagePicker({ multiple = false, onPick, children }: ImagePickerProps) {
  // Kept in state rather than a ref because `open` is handed to children during render.
  const [input, setInput] = useState<HTMLInputElement | null>(null);

  function open() {
    input?.click();
  }

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter(isImageFile);
    // Clearing the input lets the same file be picked again later.
    event.target.value = "";

    // Files the browser fails to decode are skipped instead of breaking the whole batch.
    const results = await Promise.allSettled(files.map(loadImageFile));
    const images = results.flatMap((result) =>
      result.status === "fulfilled" ? [result.value] : [],
    );
    if (images.length > 0) onPick(images);
  }

  return (
    <>
      {children(open)}
      <input
        ref={setInput}
        type="file"
        accept={ACCEPTED_TYPES}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
