const USERNAME_MAX_LENGTH = 30;

/** Applies Instagram's username rules: lowercase letters, numbers, periods and underscores. */
export function sanitizeUsername(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, "")
    .slice(0, USERNAME_MAX_LENGTH);
}
