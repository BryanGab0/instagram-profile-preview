export interface BioPart {
  text: string;
  isMention: boolean;
}

const MENTION_PATTERN = /([@#][\p{L}\p{N}_.]+)/u;

/** Splits a bio into plain text and @mentions/#hashtags, which Instagram renders as links. */
export function splitBio(bio: string): BioPart[] {
  return bio
    .split(MENTION_PATTERN)
    .filter(Boolean)
    .map((text) => ({ text, isMention: MENTION_PATTERN.test(text) }));
}
