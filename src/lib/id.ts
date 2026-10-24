/** Unique id for items created in the browser, such as posts and highlights. */
export function createId(): string {
  // randomUUID only exists on HTTPS and localhost; the fallback covers opening the
  // dev server from a phone through the local network.
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
