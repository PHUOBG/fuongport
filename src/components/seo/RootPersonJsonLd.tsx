import { SITE_URL } from "@/lib/site";

export function RootPersonJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hoang Thi Ngoc Phuong",
    url: SITE_URL,
    sameAs: [
      "https://github.com/PHUOBG",
      "https://www.linkedin.com/in/ng%E1%BB%8Dc-ph%C6%B0%C6%A1ng-7a6267411",
      "https://www.facebook.com/phuong0v0",
    ],
    jobTitle: "Software Engineer | AI & Computer Vision Engineer",
  };
  return <script type="application/ld+json">{JSON.stringify(json)}</script>;
}
