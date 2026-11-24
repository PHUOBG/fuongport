"use client";

import {
  Briefcase,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useId, useState } from "react";
import { bio } from "#velite";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { Button } from "@/components/ui/Button";
import { useSectionMotion } from "@/hooks/useSectionMotion";

const ContactAnimated = dynamic(
  () => import("./ContactAnimated").then((m) => m.ContactAnimated),
  { ssr: false }
);

export function Contact() {
  const sectionId = useId();
  const sectionMotion = useSectionMotion();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = bio.email ?? "hoangngocphuongcute@gmail.com";
  const resumeUrl = bio.resume ?? "https://canva.link/cv-cua-fuong";
  const githubUrl = bio.social?.github ?? "https://github.com/PHUOBG";
  const linkedinUrl =
    bio.social?.linkedin ??
    "https://www.linkedin.com/in/ng%E1%BB%8Dc-ph%C6%B0%C6%A1ng-7a6267411";
  const facebookUrl =
    bio.social?.facebook ?? "https://www.facebook.com/phuong0v0";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      window.prompt("Copy email address:", email);
    }
  };

  const Inner = (
    <div className="flex flex-col items-center">
      {/* Header */}
      <div className="mb-12 text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          <MessageCircle className="h-4 w-4" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Let&apos;s Connect &amp; Collaborate
        </h2>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground">
          I am actively looking for software engineering, AI/Computer Vision, and
          tech internship opportunities. Feel free to contact me directly
          through any of the channels below!
        </p>
      </div>

      {/* Main Grid: Direct Contact Channels */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Email Card (Highlight) */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/80 p-6 sm:p-8 shadow-lg backdrop-blur-md transition-all hover:border-primary/60 hover:shadow-primary/10">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Mail className="h-7 w-7" />
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
              Primary Channel
            </span>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-muted-foreground">
              Direct Email
            </p>
            <p className="mt-1 break-all text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {email}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Usually responds within a few hours.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              size="default"
              onClick={handleCopyEmail}
              className="gap-2"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Email Address</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* CV / Resume Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-6 sm:p-8 shadow-md backdrop-blur-md transition-all hover:border-border hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
              <FileText className="h-7 w-7" />
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Updated 2026
            </span>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-muted-foreground">
              Curriculum Vitae
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Online Interactive CV
            </p>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Comprehensive overview of my skills, projects, honors &amp; experiences.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild size="default" className="gap-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Full CV</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="default">
              <a href="/resume.pdf" download="CV_Hoang_Thi_Ngoc_Phuong.pdf">
                Download PDF
              </a>
            </Button>
          </div>
        </div>

        {/* Location & University Profile */}
        <div className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Location &amp; Education
              </p>
              <h3 className="text-lg font-bold text-foreground">
                Da Nang, Viet Nam
              </h3>
              <p className="text-sm text-muted-foreground">
                The University of Danang – University of Science and Technology (DUT)
              </p>
            </div>
          </div>
        </div>

        {/* Career Status Card */}
        <div className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-sm backdrop-blur-sm sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Current Status
              </p>
              <h3 className="text-lg font-bold text-foreground">
                Open to Opportunities
              </h3>
              <p className="text-sm text-muted-foreground">
                Full-stack Web Dev, AI/Vision Dev, Internship &amp; Projects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social / Professional Profiles Bar */}
      <div className="mt-8 flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/50 bg-muted/30 p-4 sm:p-6">
        <div>
          <h4 className="text-base font-semibold text-foreground">
            Connect on Professional &amp; Social Networks
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Feel free to connect or drop a message anytime.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </Button>

          <Button asChild variant="outline" size="sm" className="gap-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </Button>

          <Button asChild variant="outline" size="sm" className="gap-2">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Facebook Profile"
            >
              <FacebookIcon className="h-4 w-4" />
              <span>Facebook</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );

  if (sectionMotion) {
    return <ContactAnimated sectionId={sectionId}>{Inner}</ContactAnimated>;
  }

  return (
    <section
      id={sectionId}
      className="mx-auto w-full max-w-7xl px-4 py-16"
      data-section="contact"
    >
      {Inner}
    </section>
  );
}
