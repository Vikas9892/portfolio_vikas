/**
 * Canonical site configuration.
 *
 * `url` is the single source of truth for metadataBase, canonical links,
 * OpenGraph URLs, the sitemap and robots.txt. Point it at a custom domain by
 * editing this one line — nothing else references the host.
 */
export const siteConfig = {
  name: "Vikas Tiwari",
  title: "Vikas Tiwari — Software Engineer",
  role: "Software Engineer — Distributed Systems, Backend & Applied AI",
  url: "https://vikas-tiwari.vercel.app",
  ogImage: "/og-image.jpg",
  description:
    "B.Tech IT student at IIIT Bhopal building backend and distributed systems from first principles — raw TCP sockets, vector search, evaluation harnesses — then benchmarking them until the numbers are real.",
  email: "vikast4843@gmail.com",
  phone: "+91 9140823959",
  location: "Bhopal, India",
  resume: "/resume.pdf",
} as const;

export const socials = {
  github: "https://github.com/Vikas9892",
  linkedin: "https://www.linkedin.com/in/vikas-tiwari-71b5482a7",
  leetcode: "https://leetcode.com/u/vikas7871/",
  codeforces: "https://codeforces.com/profile/Vikas9140",
  codechef: "https://www.codechef.com/users/smack_angel_65",
} as const;

export const navSections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "competitive", label: "Competitive" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
