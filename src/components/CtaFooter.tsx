import { useState, useEffect } from "react";
import {
  Flame,
  ChevronLeft,
  Mail,
  Phone,
  Clock,
  X,
  Heart,
  Send,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { useSite } from "../store/siteStore";
import { IconByName } from "../store/icons";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function TelegramIcon({ className = "" }: { className?: string }) {
  return <Send className={className} aria-hidden="true" />;
}

export function FinalCta() {
  const { data, waLink } = useSite();
  const sec = data.finalCta;
  return (
    <section className="relative bg-cream px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <Reveal variant="scale">
        <div className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-bl from-cocoa via-night to-[#30160a] px-6 py-16 text-center text-cream shadow-lift sm:px-12 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 start-1/4 size-80 rounded-full bg-ember/30 blur-[100px] animate-pulse-glow" />
            <div className="absolute -bottom-24 end-1/4 size-72 rounded-full bg-glow/20 blur-[100px] animate-pulse-glow [animation-delay:-2.7s]" />
          </div>
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.07] px-5 py-2 text-sm font-bold text-glow backdrop-blur">
              <Flame className="size-4 animate-tick" aria-hidden="true" />
              {sec.badge}
            </span>
            <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-extrabold leading-[1.25] sm:text-5xl">
              {sec.title1}
              <br />
              <span className="text-gradient">{sec.title2Grad}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-cream/70">
              {sec.desc}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#pricing"
                className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-ember to-blaze px-10 py-4.5 text-lg font-bold text-cream shadow-warm transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] sm:w-auto"
              >
                {sec.primaryCta}
                <ChevronLeft
                  className="size-5 transition-transform duration-300 group-hover:-translate-x-1.5"
                  aria-hidden="true"
                />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark inline-flex w-full items-center justify-center gap-2 rounded-full px-10 py-4.5 text-lg font-bold text-cream transition-all duration-300 hover:bg-cream/[0.1] hover:ring-1 hover:ring-glow/40 sm:w-auto"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {sec.secondaryCta}
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-cream/60">
              {sec.trust.map((t) => (
                <li key={t.text} className="flex items-center gap-2">
                  <IconByName name={t.icon} className="size-4 text-glow" />{" "}
                  {t.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const { data, waLink } = useSite();
  const f = data.footer;
  return (
    <footer className="grain relative overflow-hidden bg-cocoa pb-24 pt-16 text-cream/80 lg:pb-14">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <a
              href="#top"
              className="flex items-center gap-2.5"
              aria-label={`${data.site.brandName} — العودة للأعلى`}
            >
              <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-ember to-glow text-cream shadow-warm">
                <Flame className="size-5" aria-hidden="true" />
              </span>
              <span className="text-2xl font-extrabold text-cream">
                {data.site.brandName}
                <span className="text-ember">.</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm leading-8 text-cream/60">
              {f.description}
            </p>
            {/* Social Media icons */}
            <div className="mt-6 flex items-center gap-3">
              {f.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:border-ember hover:bg-ember hover:text-cream"
                >
                  {s.icon === "Instagram" ? (
                    <InstagramIcon className="size-4.5" />
                  ) : s.icon === "Facebook" ? (
                    <FacebookIcon className="size-4.5" />
                  ) : s.icon === "Youtube" ? (
                    <YoutubeIcon className="size-4.5" />
                  ) : s.icon === "Send" ? (
                    <TelegramIcon className="size-4.5" />
                  ) : (
                    <IconByName
                      name={s.icon || "MessageCircle"}
                      className="size-4.5"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="روابط الموقع">
            <h3 className="text-sm font-extrabold tracking-wide text-cream">
              {f.quickTitle}
            </h3>
            <ul className="mt-5 space-y-3">
              {data.nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-cream/60 transition-colors duration-300 hover:text-glow"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="الدعم">
            <h3 className="text-sm font-extrabold tracking-wide text-cream">
              {f.helpTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/60">
              {f.helpLinks.map((l) => (
                <li key={l}>
                  <a href="#faq" className="transition-colors duration-300 hover:text-glow">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-extrabold tracking-wide text-cream">
              {f.contactTitle}
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-cream/60">
              <li className="flex items-center gap-3">
                <Phone className="size-4.5 shrink-0 text-ember" aria-hidden="true" />
                <span dir="ltr" className="tabular-nums font-bold text-cream">
                  {data.contact.phoneDisplay}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4.5 shrink-0 text-ember" aria-hidden="true" />
                <a
                  href={`mailto:${data.contact.email}`}
                  className="hover:underline text-cream/90 font-medium"
                >
                  {data.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4.5 shrink-0 text-ember" aria-hidden="true" />
                {data.contact.hours}
              </li>
            </ul>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-ember to-blaze px-6 py-3 text-sm font-bold text-cream shadow-warm transition-transform duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {f.ctaLabel}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/10 pt-8">
          <div
            className="flex flex-wrap items-center justify-center gap-2.5"
            aria-label="طرق الدفع المتاحة في مصر"
          >
            {f.payments.map((pay) => (
              <span
                key={pay}
                className="rounded-full border border-cream/15 px-4 py-1.5 text-xs font-bold text-cream/70"
              >
                {pay}
              </span>
            ))}
          </div>
          <p className="mt-7 flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-cream/45">
            {f.copyright}{" "}
            <Heart className="size-3.5 fill-ember text-ember" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export function StickyBar() {
  const { data } = useSite();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 650);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 transition-all duration-700 lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[130%] opacity-0"
      }`}
      role="region"
      aria-label="شريط الطلب السريع"
    >
      <div className="glass-dark flex items-center justify-between gap-3 rounded-3xl bg-night/95 p-3 ps-5 shadow-lift ring-1 ring-cream/10 backdrop-blur-xl">
        <div>
          <p className="text-[11px] font-bold text-cream/70">
            عرض مصر: شحن مجاني اليوم
          </p>
          <p className="text-lg font-extrabold tabular-nums text-cream">
            {data.hero.priceNow} <span className="text-xs text-glow">جنيه</span>
            <span className="ms-2 text-xs font-semibold text-cream/45 line-through">
              {data.hero.priceOld}
            </span>
          </p>
        </div>
        <a
          href="#pricing"
          className="btn-shine rounded-full bg-gradient-to-l from-ember to-blaze px-6 py-3 text-sm font-extrabold text-cream shadow-warm"
        >
          اطلبي الآن
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="إخفاء الشريط"
          className="grid size-8 shrink-0 place-items-center rounded-full text-cream/50 transition-colors hover:text-cream"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
