import type { PreviewLocale } from "./types";

export interface PreviewStrings {
  posts: string;
  followers: string;
  following: string;
  follow: string;
  message: string;
  noPosts: string;
}

export const PREVIEW_STRINGS: Record<PreviewLocale, PreviewStrings> = {
  en: {
    posts: "posts",
    followers: "followers",
    following: "following",
    follow: "Follow",
    message: "Message",
    noPosts: "No posts yet",
  },
  "pt-BR": {
    posts: "posts",
    followers: "seguidores",
    following: "seguindo",
    follow: "Seguir",
    message: "Mensagem",
    noPosts: "Ainda não há nenhum post",
  },
};
