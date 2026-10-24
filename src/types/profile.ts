export interface Highlight {
  id: string;
  name: string;
  /** Cover image as a data URL, or null when not set. */
  image: string | null;
}

export interface Post {
  id: string;
  /** Image as a data URL. */
  image: string;
}

export interface Profile {
  username: string;
  displayName: string;
  bio: string;
  website: string;
  /** Avatar as a data URL, or null when not set. */
  avatar: string | null;
  isVerified: boolean;
  /** Shows the gradient ring around the avatar, as when the account has an active story. */
  hasStory: boolean;
  // Stored as text so users can type counts the way Instagram shows them ("1.2K", "10,5 mil").
  postsCount: string;
  followersCount: string;
  followingCount: string;
  highlights: Highlight[];
  posts: Post[];
}
