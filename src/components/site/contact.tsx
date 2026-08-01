"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, FileText, Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { socialLinks } from "./social-icons";

type ContactItem = {
  icon: typeof Mail;
  label: string;
  value: string;
  /** Value placed on the clipboard — defaults to the displayed value. */
  copyValue?: string;
  href?: string;
};

const items: ContactItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: `${siteConfig.location} · open to relocation`,
    copyValue: siteConfig.location,
  },
];

function Toast({ message }: { message: string | null }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className="flex items-center gap-2.5 rounded-full border border-accent/30 bg-card px-5 py-2.5 text-sm shadow-xl shadow-black/25"
          >
            <Check className="size-4 text-accent" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact() {
  const [toast, setToast] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<string | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async (item: ContactItem) => {
    const text = item.copyValue ?? item.value;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(item.label);
      setToast(`${item.label} copied to clipboard`);
    } catch {
      // Clipboard access can be denied — say so rather than silently no-op.
      setToast(`Could not copy — ${text}`);
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setToast(null);
      setCopied(null);
    }, 2200);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-border py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="grid-pattern pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 size-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/10 blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent">
            06 / Contact
          </p>
          <h2
            id="contact-heading"
            className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl"
          >
            Let&rsquo;s talk
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Open to SDE and AI engineering internships. I reply to everything.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <ul className="space-y-3">
              {items.map((item) => {
                const Icon = item.icon;
                const isCopied = copied === item.label;
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-colors hover:border-accent/40 sm:p-5"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-subtle text-accent">
                      <Icon className="size-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="block truncate text-base transition-colors hover:text-accent"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="truncate text-base">{item.value}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => copy(item)}
                      aria-label={`Copy ${item.label.toLowerCase()}`}
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      {isCopied ? (
                        <Check className="size-4 text-accent" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {socialLinks.map(({ label, href, Icon, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-3.5 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 sm:p-5"
                  >
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-xl transition-colors"
                      style={{ backgroundColor: `${color}1f`, color }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-base">{label}</span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="sm:flex-1">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail className="size-4" />
                Email me
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="sm:flex-1">
              <a href={siteConfig.resume}>
                <FileText className="size-4" />
                Download résumé
              </a>
            </Button>
          </div>
        </Reveal>
      </div>

      <Toast message={toast} />
    </section>
  );
}
