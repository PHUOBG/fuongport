"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { bio } from "#velite";
import { SocialLink } from "@/components/layout/SocialLink";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motionPresets";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { HERO_SOCIALS } from "./Hero.data";

type HeroAnimatedProps = {
  greeting: string;
  /** False until the visitor's clock has been read; see {@link useDayPhase}. */
  greetingReady: boolean;
  nameGradientClass: string;
  tagline: string;
  taglineLabel: string;
  stackRibbons: string[];
  reduceMotion: boolean;
  /**
   * Whether to render the blinking terminal caret. Owned by `Hero`, which resolves it from the
   * theme *and* the motion preference -- see the note there.
   *
   * This component used to decide for itself with `!reduceMotion`, which is a constant `true`
   * here: `Hero` only renders `HeroAnimated` when motion is allowed. That rendered the caret
   * element in all seven themes, leaving an un-blinked 4px rule beside the tagline everywhere
   * the CSS was not scoped to Cyberpunk.
   */
  showCaret: boolean;
};

export function HeroAnimated({
  greeting,
  greetingReady,
  nameGradientClass,
  tagline,
  taglineLabel,
  stackRibbons,
  reduceMotion,
  showCaret,
}: HeroAnimatedProps) {
  const Inner = (
    <div className="flex w-full max-w-6xl flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
      <HeroContentAnimated
        greeting={greeting}
        greetingReady={greetingReady}
        nameGradientClass={nameGradientClass}
        tagline={tagline}
        taglineLabel={taglineLabel}
        stackRibbons={stackRibbons}
        reduceMotion={reduceMotion}
        showCaret={showCaret}
      />
      <HeroImageAnimated reduceMotion={reduceMotion} />
    </div>
  );

  return (
    <motion.section
      key="hero-animated"
      data-section="hero"
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={staggerContainer(0.15)}
      className="flex min-h-[90vh] items-center justify-center px-6 py-20 lg:py-28"
      aria-label="Hero section"
    >
      {Inner}
    </motion.section>
  );
}

const HeroContentAnimated = memo(
  ({
    greeting,
    greetingReady,
    nameGradientClass,
    tagline,
    taglineLabel,
    stackRibbons,
    reduceMotion,
    showCaret,
  }: {
    greeting: string;
    greetingReady: boolean;
    nameGradientClass: string;
    tagline: string;
    taglineLabel: string;
    stackRibbons: string[];
    reduceMotion: boolean;
    showCaret: boolean;
  }) => {
    const ariaLabel = taglineLabel || bio.tagline || "Tagline";
    return (
      <div className="flex flex-col items-center lg:items-start">
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="flex flex-col items-center lg:items-start"
        >
          {/* Time-dependent text; see the note in `Hero`. The line keeps its height so nothing
              shifts when the greeting arrives. */}
          <span
            className="min-h-lh font-medium text-muted-foreground text-xl md:text-2xl"
            aria-live="polite"
          >
            {greetingReady ? greeting : null}
          </span>

          <div className="flex flex-row items-center gap-x-1">
            <div className="flex translate-y-1 flex-col">
              <span className="font-medium text-muted-foreground text-xl leading-tight md:text-2xl">
                Hi!
              </span>
              <span className="font-medium text-muted-foreground text-xl leading-tight md:text-2xl">
                I&apos;m
              </span>
            </div>
            <h1
              className={cn(
                "bg-clip-text font-extrabold text-5xl text-transparent md:text-7xl",
                "leading-snug transition-colors duration-500",
                nameGradientClass
              )}
            >
              {bio.name?.trim() ? bio.name : "Portfolio"}
            </h1>
          </div>
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-1 flex h-10 flex-row items-center"
        >
          <h2
            className="font-semibold text-2xl text-primary md:text-3xl"
            aria-label={ariaLabel}
          >
            {tagline}
            {tagline.length === 0 ? <span className="sr-only">{ariaLabel}</span> : null}
            {showCaret ? (
              <span
                className="terminal-cursor ml-0.5 inline-block h-[1.15em] w-0"
                aria-hidden
              />
            ) : null}
          </h2>
        </motion.div>

        <motion.ul
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-3 flex list-none flex-wrap justify-center gap-2 p-0 lg:justify-start"
          aria-label="Core focus areas"
        >
          {stackRibbons.map((label) => (
            <li
              key={label}
              className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 font-medium text-muted-foreground text-xs"
            >
              {label}
            </li>
          ))}
        </motion.ul>

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-4 max-w-xl text-lg text-muted-foreground leading-snug md:text-xl lg:text-left"
        >
          {bio.summary}
        </motion.p>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
        >
          <Button
            asChild
            size="lg"
            aria-label="View Projects"
          >
            <Link href={ROUTES.projects}>
              View Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            aria-label="Contact Me"
          >
            <Link href={ROUTES.contact}>Contact Me</Link>
          </Button>
        </motion.div>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
        >
          {HERO_SOCIALS.map((social) => (
            <SocialLink
              key={social.name}
              {...social}
            />
          ))}
        </motion.div>
      </div>
    );
  }
);
HeroContentAnimated.displayName = "HeroContentAnimated";

const HeroImageAnimated = memo(({ reduceMotion }: { reduceMotion: boolean }) => {
  return (
    <motion.div
      variants={reduceMotion ? undefined : fadeUp}
      className={cn(
        "group relative h-64 w-64 shrink-0 overflow-hidden rounded-full border-4 border-accent sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[400px] xl:w-[400px]",
        reduceMotion ? "" : "animate-float"
      )}
    >
      <Image
        src="/assets/images/ngoc-phuong-hero.jpg"
        alt="Ngoc Phuong profile photo"
        fill
        sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 400px"
        quality={95}
        className="scale-[1.28] object-cover object-[50%_58%] transition-transform duration-300 ease-in-out group-hover:scale-[1.34]"
        priority
      />
    </motion.div>
  );
});
HeroImageAnimated.displayName = "HeroImageAnimated";
