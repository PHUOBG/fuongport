import { FileText, Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { bio } from "#velite";
import { FacebookIcon as Facebook } from "@/components/icons/FacebookIcon";
import { GithubIcon as Github } from "@/components/icons/GithubIcon";
import { LinkedinIcon as Linkedin } from "@/components/icons/LinkedinIcon";

export const HERO_TAGLINES = [
  "Software Engineer & AI Vision Engineer",
  "Front-end Developer & UI/UX Designer",
  "Building AI-powered web & vision systems",
  "Become someone who creates value and improves every day",
] as const;

export const HERO_STACK_RIBBONS = [
  "Python · TypeScript · C# · C/C++ · Java",
  "Front-end · Backend · AI & Computer Vision · UI/UX",
  "Product-minded · UI/UX-focused · Open to Work",
] as const;

export type HeroSocialLink = {
  href: string;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  colorClass: string;
};

export const HERO_SOCIALS: HeroSocialLink[] = [
  {
    href: bio.social.github,
    name: "GitHub",
    icon: Github,
    colorClass: "hover:bg-[#181717] hover:text-white",
  },
  {
    href: `mailto:${bio.email}`,
    name: "Gmail",
    icon: Mail,
    colorClass: "hover:bg-[#EA4335] hover:text-white",
  },
  {
    href: bio.social.linkedin,
    name: "LinkedIn",
    icon: Linkedin,
    colorClass: "hover:bg-[#0A66C2] hover:text-white",
  },
  {
    href: bio.social.facebook ?? "https://www.facebook.com/phuong0v0",
    name: "Facebook",
    icon: Facebook,
    colorClass: "hover:bg-[#1877F2] hover:text-white",
  },
  {
    href: bio.resume ?? "https://canva.link/cv-cua-fuong",
    name: "Resume",
    icon: FileText,
    colorClass: "hover:bg-[#1DB954] hover:text-white",
  },
];
