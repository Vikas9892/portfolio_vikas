import { siteConfig } from "@/lib/site";
import { socialLinks } from "./social-icons";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-md bg-accent font-mono text-[0.625rem] font-bold text-accent-foreground">
            VT
          </span>
          <p className="font-mono text-xs text-muted-foreground">
            {siteConfig.name} · Built with Next.js
          </p>
        </div>

        <ul className="flex items-center gap-1.5">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} profile`}
                className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-accent"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
