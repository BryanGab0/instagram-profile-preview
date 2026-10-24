import { useState, type DragEvent } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ProfileActions } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/profile";
import { ImagePicker } from "./ImagePicker";
import { Section } from "./Section";

interface PostsSectionProps {
  posts: Post[];
  actions: Pick<ProfileActions, "addPosts" | "removePost" | "movePost">;
}

const overlayButton =
  "flex size-7 items-center justify-center rounded-full bg-black/60 text-white outline-none hover:bg-black/80 focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30 [&_svg]:size-4";

export function PostsSection({ posts, actions }: PostsSectionProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);

  function endDrag() {
    setDraggedId(null);
    setTargetIndex(null);
  }

  function handleDrop(event: DragEvent, index: number) {
    event.preventDefault();
    if (draggedId) actions.movePost(draggedId, index);
    endDrag();
  }

  return (
    <ImagePicker multiple onPick={actions.addPosts}>
      {(open) => (
        <Section
          title="Posts"
          action={
            <Button variant="outline" size="sm" onClick={open}>
              <Plus /> Adicionar
            </Button>
          }
        >
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Escolha várias imagens de uma vez para montar o grid. As mais novas aparecem primeiro,
              como no Instagram.
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Arraste para mudar a ordem, ou use as setas.
              </p>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {posts.map((post, index) => (
                  <li
                    key={post.id}
                    draggable
                    onDragStart={() => setDraggedId(post.id)}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setTargetIndex(index);
                    }}
                    onDrop={(event) => handleDrop(event, index)}
                    onDragEnd={endDrag}
                    className={cn(
                      "group relative aspect-[3/4] cursor-grab overflow-hidden rounded-lg bg-secondary active:cursor-grabbing",
                      draggedId === post.id && "opacity-40",
                      targetIndex === index &&
                        draggedId !== post.id &&
                        "ring-2 ring-ring ring-offset-2 ring-offset-card",
                    )}
                  >
                    <img
                      src={post.image}
                      alt={`Post ${index + 1}`}
                      draggable={false}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                      <button
                        type="button"
                        className={overlayButton}
                        onClick={() => actions.movePost(post.id, index - 1)}
                        disabled={index === 0}
                        aria-label={`Mover post ${index + 1} para trás`}
                      >
                        <ChevronLeft />
                      </button>
                      <button
                        type="button"
                        className={overlayButton}
                        onClick={() => actions.removePost(post.id)}
                        aria-label={`Remover post ${index + 1}`}
                      >
                        <Trash2 />
                      </button>
                      <button
                        type="button"
                        className={overlayButton}
                        onClick={() => actions.movePost(post.id, index + 1)}
                        disabled={index === posts.length - 1}
                        aria-label={`Mover post ${index + 1} para frente`}
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Section>
      )}
    </ImagePicker>
  );
}
