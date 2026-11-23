"use client";

import { BookOpen, Cpu, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type AboutContentProps = {
  headingGradient: string;
  /**
   * Which heading level to render. The home page already has an `<h1>` (the hero name), so its
   * About section passes `"h2"`; `/about` keeps `"h1"`.
   */
  headingAs?: "h1" | "h2";
};

type AboutActivityCard = {
  id: string;
  shortTitle: string;
  title: string;
  period: string;
  image: string;
  description: string;
};

const ABOUT_CARDS: readonly AboutActivityCard[] = [
  {
    id: "about1",
    shortTitle: "GDGoC – DUT",
    title: "Gen 7 Member @ GDGoC – DUT",
    period: "2025",
    image: "/assets/images/about/about1.jpg",
    description:
      "Active contributor to the FairInSign smart legal platform product team, speaker/participant in software & soft-skills sharing sessions, and delegate at major Google tech events.",
  },
  {
    id: "about2",
    shortTitle: "DUT HarvestAI",
    title: "AI Vision & Media Contributor – DUT HarvestAI",
    period: "2026 · Top 12 AIoT InnoWorks",
    image: "/assets/images/about/about2.jpg",
    description:
      "Engineered the AI Vision module and spearheaded project documentation and promotional video production, helping the team achieve Top 12 at AIoT Developer InnoWorks 2026.",
  },
  {
    id: "about3",
    shortTitle: "VoiceTurk – CONVO AI",
    title: "Team Member – VoiceTurk @ VONVO AI Hackathon 2026",
    period: "2026 · Hackathon Champion",
    image: "/assets/images/about/about3.jpg",
    description:
      "Co-built an AI Voice Coach platform that optimizes crowd-sourced speech recording for Vietnamese and low-resource languages, delivering high-quality training datasets for the Vietnamese AI and voicebot community.",
  },
  {
    id: "about4",
    shortTitle: "FAIRINSIGHT",
    title: "Frontend Developer – FAIRINSIGHT",
    period: "2025 – 2026",
    image: "/assets/images/about/about4.jpg",
    description:
      "Built the user interface for an AI-powered legal analysis and reasoning system, contributing to top placements in multiple regional (Da Nang) and national startup and innovation competitions.",
  },
  {
    id: "about5",
    shortTitle: "Hue Science & Engineering Fair",
    title: "Project Leader @ Hue City Science and Engineering Fair",
    period: "Research & Leadership",
    image: "/assets/images/about/about5.jpg",
    description:
      "Led multiple research teams from ideation to competition, including an Agricultural Mulch Film Laying Assistive Device and an Interactive GeoGebra Step-by-Step Math Solver for the 10th-Grade Curriculum.",
  },
  {
    id: "about6",
    shortTitle: "TINPATH Mentor",
    title: "Technical & Ideation Mentor – TINPATH",
    period: "EdTech Mentorship",
    image: "/assets/images/about/about6.jpg",
    description:
      "Guided high school students at Tran Quoc Tuan High School (Quang Ngai) in ideating and coding TINPATH, an AI-powered EdTech platform for National High School Informatics Exam preparation, for the Science and Engineering Fair.",
  },
];

const KEY_STRENGTHS = [
  {
    icon: Cpu,
    title: "Technology Enthusiast",
    description:
      "Passionate about exploring emerging technologies, with hands-on experience in software development and AI-driven solutions.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learner",
    description:
      "Eager to expand my knowledge, embrace new challenges, and contribute to meaningful projects that solve real-world problems.",
  },
  {
    icon: Users,
    title: "Collaborative Leader",
    description:
      "Experienced in leading and collaborating with teams through technology projects and developer communities, fostering innovation and teamwork.",
  },
] as const;

type SkillPillCategory = "ai" | "frontend" | "backend" | "devops";

const SKILL_PILLS: readonly { label: string; category: SkillPillCategory }[] = [
  { label: "Python", category: "ai" },
  { label: "Computer Vision", category: "ai" },
  { label: "LLM & Agentic AI", category: "ai" },
  { label: "RAG & LangGraph", category: "ai" },
  { label: "TypeScript", category: "frontend" },
  { label: "React", category: "frontend" },
  { label: "Next.js", category: "frontend" },
  { label: "Tailwind CSS", category: "frontend" },
  { label: "FastAPI", category: "backend" },
  { label: "ASP.NET Core / C#", category: "backend" },
  { label: "PostgreSQL & pgvector", category: "backend" },
  { label: "Docker", category: "devops" },
  { label: "Git & GitHub Actions", category: "devops" },
  { label: "Linux & Cloud", category: "devops" },
];

const PILL_STYLES: Record<SkillPillCategory, string> = {
  ai: "border-cyan-500/60 bg-cyan-500/10 text-foreground",
  frontend: "border-emerald-500/60 bg-emerald-500/10 text-foreground",
  backend: "border-purple-500/60 bg-purple-500/10 text-foreground",
  devops: "border-amber-500/60 bg-amber-500/10 text-foreground",
};

export function AboutContent({ headingGradient, headingAs = "h1" }: AboutContentProps) {
  const [mounted, setMounted] = useState(false);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const Heading = headingAs;

  return (
    <div className="flex flex-col gap-10">
      {/* Section Header */}
      <div>
        <Heading
          className={cn(
            "bg-clip-text font-bold text-4xl text-transparent",
            mounted ? `bg-linear-to-r ${headingGradient}` : "bg-linear-to-r from-primary to-accent"
          )}
        >
          About Me
        </Heading>
        <div className="mt-3 h-1 w-24 rounded-full bg-primary" />
        <p className="mt-2 text-muted-foreground text-sm">
          Click any photo card to read the project &amp; activity summary.
        </p>
      </div>

      {/* Main 2-column layout inspired by murathan.info */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: 2x3 Interactive Photo/Summary Card Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
          {ABOUT_CARDS.map((card) => {
            const isFlipped = Boolean(flippedIds[card.id]);
            const imgSrc = failedImages[card.id] ? "/assets/images/placeholder.svg" : card.image;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => toggleCard(card.id)}
                aria-expanded={isFlipped}
                aria-label={`${card.title} — click to ${isFlipped ? "show photo" : "read summary"}`}
                className={cn(
                  "group relative aspect-16/11 w-full cursor-pointer overflow-hidden rounded-2xl border text-left transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isFlipped
                    ? "border-primary/50 bg-card/95 p-5 shadow-lg"
                    : "border-border/60 bg-card hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xl"
                )}
              >
                {isFlipped ? (
                  <div className="flex h-full flex-col justify-between">
                    <div className="space-y-2 overflow-y-auto pr-1">
                      <span className="block font-bold text-base text-foreground leading-snug sm:text-lg">
                        {card.title}
                      </span>
                      <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                        {card.description}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between pt-1">
                      <span className="font-mono font-semibold text-primary text-xs">
                        {card.period}
                      </span>
                      <span className="text-[11px] text-muted-foreground">Click to view photo</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={imgSrc}
                      alt={card.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={() => {
                        setFailedImages((prev) => ({ ...prev, [card.id]: true }));
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                      <div>
                        <span className="block font-bold text-sm text-white drop-shadow-sm sm:text-base">
                          {card.shortTitle}
                        </span>
                        <span className="block font-mono text-[11px] text-white/75">
                          {card.period}
                        </span>
                      </div>
                      <span className="rounded-full bg-black/50 px-2.5 py-0.5 font-medium text-[11px] text-white/90 backdrop-blur-xs transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        Details
                      </span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Narrative Bio + Key Strengths + Skills & Tools Pills */}
        <div className="flex flex-col gap-6 text-left lg:col-span-5">
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed sm:text-lg">
            <p>
              I am an Information Technology student specializing in the Enterprise Cooperation
              Program at{" "}
              <strong className="font-semibold text-foreground">
                The University of Danang – University of Science and Technology (DUT)
              </strong>
              . Passionate about technology and continuous learning, I have gained hands-on
              experience as a Software Developer and AI Vision Developer.
            </p>
            <p>
              I enjoy exploring emerging technologies, solving real-world problems, mentoring
              students, and turning ideas into practical solutions that create real value.
            </p>
          </div>

          {/* 3 Key Strengths */}
          <div className="space-y-4 border-border/60 border-t pt-5">
            {KEY_STRENGTHS.map((strength) => (
              <div
                key={strength.title}
                className="flex items-start gap-3.5"
              >
                <strength.icon className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h2 className="font-semibold text-base text-foreground">{strength.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Skills & Tools Pills (murathan.info style) */}
          <div className="border-border/60 border-t pt-5">
            <h2 className="mb-3 font-bold text-foreground text-lg">Skills &amp; Tools</h2>
            <div className="flex flex-wrap gap-2">
              {SKILL_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className={cn(
                    "rounded-full border px-3 py-1 font-medium text-xs transition-transform hover:scale-105",
                    PILL_STYLES[pill.category]
                  )}
                >
                  {pill.label}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" /> AI &amp; Vision
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Frontend &amp; UI/UX
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-purple-400" /> Backend &amp; Data
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> DevOps &amp; Cloud
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
