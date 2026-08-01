import * as React from "react";
import { Github, Linkedin } from "lucide-react";

import { socials } from "@/lib/site";

type IconProps = React.SVGProps<SVGSVGElement>;

/** Codeforces — the three ascending bars of the platform mark. */
function CodeforcesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="2" y="9" width="5" height="12" rx="1.5" />
      <rect x="9.5" y="3" width="5" height="18" rx="1.5" />
      <rect x="17" y="6.5" width="5" height="14.5" rx="1.5" />
    </svg>
  );
}

/** CodeChef — the chef's hat. Overlapping fills merge into the puff. */
function CodeChefIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="7.9" cy="9.6" r="3.7" />
      <circle cx="12" cy="7.7" r="4.1" />
      <circle cx="16.1" cy="9.6" r="3.7" />
      <path d="M7.1 12.2h9.8v6.6a1.7 1.7 0 0 1-1.7 1.7H8.8a1.7 1.7 0 0 1-1.7-1.7z" />
    </svg>
  );
}

/** LeetCode — the hook and crossbar of the platform mark. */
function LeetCodeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

export type SocialLink = {
  label: string;
  href: string;
  Icon: React.ComponentType<IconProps>;
  /** Brand tint used on hover in the contact grid. */
  color: string;
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: socials.github, Icon: Github, color: "#8b949e" },
  { label: "LinkedIn", href: socials.linkedin, Icon: Linkedin, color: "#0a66c2" },
  { label: "LeetCode", href: socials.leetcode, Icon: LeetCodeIcon, color: "#e08a1e" },
  {
    label: "Codeforces",
    href: socials.codeforces,
    Icon: CodeforcesIcon,
    color: "#1f8acb",
  },
  { label: "CodeChef", href: socials.codechef, Icon: CodeChefIcon, color: "#b8862f" },
];

export { CodeforcesIcon, CodeChefIcon, LeetCodeIcon };
