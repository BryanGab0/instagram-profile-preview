import type { Profile } from "@/types/profile";

export const DEFAULT_PROFILE: Profile = {
  username: "seuperfil",
  displayName: "Seu Nome",
  bio: "✨ Sua bio aqui\n📍 Cidade, País",
  website: "linktr.ee/seuperfil",
  avatar: null,
  isVerified: false,
  hasStory: true,
  postsCount: "42",
  followersCount: "1.2K",
  followingCount: "380",
  highlights: [
    { id: "default-highlight-1", name: "Viagens", image: null },
    { id: "default-highlight-2", name: "Comida", image: null },
    { id: "default-highlight-3", name: "Lifestyle", image: null },
  ],
  posts: [],
};
