"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GithubIcon as Github } from "@/components/icons/GithubIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { isolateBackground } from "@/lib/backgroundIsolation";
import { acquireScrollLock } from "@/lib/scrollLock";
import { cn } from "@/lib/utils";

export interface ProjectModalItem {
  slug?: string;
  url: string;
  title: string;
  description?: string;
  cover?: string;
  gallery?: string[];
  tags?: string[];
  liveUrl?: string;
  videoUrl?: string;
  repository?: string;
  role?: string;
  achievement?: string;
}

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: ProjectModalItem;
  onClose: () => void;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const releaseLockRef = useRef<() => void>(() => {});
  const headingId = useId();

  const galleryImages = useMemo(() => {
    const items = (project.gallery ?? []).filter(Boolean).slice(0, 4);
    if (items.length > 0) return items;
    return [project.cover || "/assets/images/placeholder.svg"];
  }, [project.gallery, project.cover]);

  const [activeImage, setActiveImage] = useState<string>(
    galleryImages[0] ?? project.cover ?? "/assets/images/placeholder.svg"
  );

  useEffect(() => {
    setActiveImage(galleryImages[0] ?? project.cover ?? "/assets/images/placeholder.svg");
  }, [galleryImages, project.cover]);

  const handleClose = useCallback(() => {
    onClose();
    releaseLockRef.current();
  }, [onClose]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener("keydown", onKey);
    const release = acquireScrollLock();
    releaseLockRef.current = release;
    return () => {
      document.removeEventListener("keydown", onKey);
      releaseLockRef.current();
      releaseLockRef.current = () => {};
    };
  }, [handleClose]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const restore = isolateBackground(overlay);
    return () => {
      restore?.();
    };
  }, []);

  if (typeof document === "undefined") return null;

  const dialog = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <motion.button
        type="button"
        aria-label="Close project dialog"
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        ref={dialogRef}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
        className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-border/70 bg-card p-5 shadow-2xl sm:p-7"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 rounded-full border border-border/60 bg-background/80 p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left: Active Preview + 4 Gallery Images */}
          <div className="flex flex-col gap-3 lg:col-span-7">
            <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl border border-border/60 bg-muted">
              <Image
                src={activeImage}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {galleryImages.map((img, idx) => {
                const isSelected = img === activeImage;
                return (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    aria-label={`View image ${idx + 1} of ${project.title}`}
                    aria-pressed={isSelected}
                    className={cn(
                      "relative aspect-16/10 w-full cursor-pointer overflow-hidden rounded-lg border transition-all",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isSelected
                        ? "border-primary ring-2 ring-primary/60"
                        : "border-border/60 opacity-75 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} gallery ${idx + 1}`}
                      fill
                      sizes="(max-width: 1023px) 25vw, 14vw"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Concise Project Info & Links */}
          <div className="flex flex-col justify-between gap-5 lg:col-span-5 lg:pr-6">
            <div className="space-y-4">
              {project.achievement && (
                <p className="font-mono font-semibold text-primary text-xs uppercase tracking-wider">
                  {project.achievement}
                </p>
              )}
              <div>
                <h3
                  id={headingId}
                  className="font-bold text-2xl text-foreground tracking-tight sm:text-3xl"
                >
                  {project.title}
                </h3>
                {project.role && (
                  <p className="mt-1 font-medium text-muted-foreground text-sm">{project.role}</p>
                )}
              </div>

              {project.description && (
                <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                  {project.description}
                </p>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-border/60 border-t pt-4">
              {project.liveUrl && (
                <Button
                  asChild
                  size="sm"
                >
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Website
                    <ArrowUpRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {project.videoUrl && (
                <Button
                  asChild
                  size="sm"
                >
                  <Link
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play className="mr-1.5 h-4 w-4" />
                    Project Video
                  </Link>
                </Button>
              )}
              {project.repository && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                >
                  <Link
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-1.5 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(dialog, document.body);
}
