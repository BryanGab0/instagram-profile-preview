/** Instagram displays images at 1080px; anything larger only wastes memory and storage. */
const MAX_IMAGE_SIZE = 1080;
const JPEG_QUALITY = 0.85;

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

/** Scales `width × height` down so the longest side fits `maxSize`, keeping the ratio. */
export function fitWithin(width: number, height: number, maxSize: number) {
  const scale = Math.min(1, maxSize / Math.max(width, height));
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function decodeImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not decode image"));
    image.src = src;
  });
}

/** Reads an image file as a data URL, downscaling it when larger than Instagram needs. */
export async function loadImageFile(file: File): Promise<string> {
  const original = await readAsDataUrl(file);
  const image = await decodeImage(original);
  const { width, height } = fitWithin(image.naturalWidth, image.naturalHeight, MAX_IMAGE_SIZE);

  if (width === image.naturalWidth) return original;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")?.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}
