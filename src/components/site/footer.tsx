import { siteConfig, socials } from "@/lib/site";
import { socialLinks } from "./social-icons";

/**
 * Evaluated once when the page is statically prerendered, so this reports the
 * build date rather than the visitor's clock — and cannot drift between the
 * server HTML and the hydrated client.
 */
const BUILD_DATE = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:px-8 md:flex-row">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-7 shrink-0 place-items-center rounded-md bg-accent font-mono text-[0.625rem] font-bold text-accent-foreground"
          >
            VT
          </span>
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            Built with Next.js
            <span aria-hidden="true"> · </span>
            <a
              href={`${socials.github}/portfolio_vikas`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-2 transition-colors hover:text-accent"
            >
              Source on GitHub
            </a>
            <span aria-hidden="true"> · </span>
            Last updated {BUILD_DATE}
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

      <p className="mx-auto mt-6 max-w-6xl px-5 text-center font-mono text-[0.6875rem] text-muted-foreground sm:px-8 md:text-left">
        {siteConfig.name} · {siteConfig.location}
      </p>
    </footer>
  );
}
