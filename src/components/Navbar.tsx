import { useEffect, useState } from "react";
import {
  Flame,
  Menu,
  X,
  ChevronLeft,
  Timer,
  User,
  LogOut,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { useCountdown } from "./Reveal";
import { useSite } from "../store/siteStore";

export default function Navbar({
  onOpenAdmin,
  onOpenAuth,
}: {
  onOpenAdmin?: () => void;
  onOpenAuth?: (mode?: "customer" | "admin") => void;
}) {
  const { data, user, logout, getUserOrders } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { h, m, s } = useCountdown();

  const userOrdersCount = getUserOrders().length;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {data.announcement.enabled && (
        <div className="relative overflow-hidden bg-gradient-to-l from-ember via-blaze to-glow text-cream">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-[13px] font-semibold sm:text-sm">
            <Flame className="size-4 shrink-0 animate-tick" aria-hidden="true" />
            <p className="truncate">
              {data.announcement.text}
              <span className="mx-1 opacity-60">|</span>
              {data.announcement.suffix}
            </p>
            <span className="hidden items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 tabular-nums sm:inline-flex">
              <Timer className="size-3.5" aria-hidden="true" />
              {h}:{m}:{s}
            </span>
          </div>
        </div>
      )}

      <nav
        className={`transition-all duration-500 ${
          scrolled
            ? "glass shadow-[0_12px_40px_-16px_rgba(44,25,15,0.18)]"
            : "bg-transparent"
        }`}
        aria-label="التنقل الرئيسي"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label={`${data.site.brandName} — الرئيسية`}
          >
            <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-ember to-glow text-cream shadow-warm transition-transform duration-500 group-hover:rotate-12">
              <Flame className="size-5" aria-hidden="true" />
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-ink">
              {data.site.brandName}
              <span className="text-ember">.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {data.nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors duration-300 hover:text-ember after:absolute after:inset-x-4 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-ember after:to-glow after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            {/* Customer / Admin Profile state */}
            {user ? (
              <div className="hidden items-center gap-2 sm:inline-flex">
                <button
                  onClick={() => onOpenAuth?.(user.isAdmin ? "admin" : "customer")}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-parchment/80 px-3 py-1.5 text-xs font-bold text-ink backdrop-blur hover:bg-parchment"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-ember/15 text-ember">
                    {user.isAdmin ? (
                      <ShieldCheck className="size-3.5" />
                    ) : (
                      <User className="size-3.5" />
                    )}
                  </span>
                  <span className="max-w-[100px] truncate">
                    {user.displayName || user.email?.split("@")[0]}
                  </span>
                  {userOrdersCount > 0 && (
                    <span className="rounded-full bg-ember px-1.5 py-0.2 text-[10px] text-white">
                      {userOrdersCount}
                    </span>
                  )}
                </button>

                {/* Logout Button */}
                <button
                  onClick={() => logout()}
                  title="تسجيل الخروج"
                  className="grid size-9 place-items-center rounded-full border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
                  aria-label="تسجيل الخروج"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth?.("customer")}
                className="hidden items-center gap-1.5 rounded-full border border-ink/10 bg-parchment/70 px-4 py-2 text-xs font-bold text-ink backdrop-blur transition hover:bg-white sm:inline-flex"
              >
                <PackageCheck className="size-4 text-ember" />
                دخول / تتبع الطلب
              </button>
            )}

            {/* Admin Button */}
            <button
              onClick={onOpenAdmin}
              className={`hidden items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition sm:inline-flex ${
                user?.isAdmin
                  ? "bg-ink text-white hover:bg-cocoa shadow-sm"
                  : "border border-ink/10 bg-parchment/60 text-ink-soft hover:bg-parchment hover:text-ink"
              }`}
            >
              {user?.isAdmin ? (
                <>
                  <ShieldCheck className="size-3.5 text-glow" /> لوحة الإدارة
                </>
              ) : (
                "لوحة التحكم"
              )}
            </button>

            {/* Order CTA */}
            <a
              href="#pricing"
              className="btn-shine group hidden items-center gap-2 rounded-full bg-gradient-to-l from-ember to-blaze px-5 py-2.5 text-sm font-bold text-cream shadow-warm transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03] md:inline-flex"
            >
              {data.nav.ctaLabel}
              <ChevronLeft
                className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              className="grid size-10 place-items-center rounded-full border border-ink/10 bg-parchment/70 text-ink transition-colors hover:bg-sand lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress line */}
        <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-transparent">
          <div
            className="h-full bg-gradient-to-l from-ember via-blaze to-glow transition-[width] duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Mobile Dropdown Panel */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden ${
            open ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="glass mx-3 mb-3 space-y-1.5 rounded-3xl p-4 shadow-lift">
            {/* User status in mobile */}
            {user ? (
              <li className="flex items-center justify-between rounded-2xl bg-parchment p-3 text-xs font-bold">
                <span className="flex items-center gap-2">
                  <User className="size-4 text-ember" />
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-red-700"
                >
                  <LogOut className="size-3" /> خروج
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    onOpenAuth?.("customer");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-ink/10 bg-parchment py-3 text-sm font-bold text-ink"
                >
                  <User className="size-4 text-ember" />
                  دخول بحساب Google / تتبع الطلب
                </button>
              </li>
            )}

            {data.nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-ember/10 hover:text-ember"
                >
                  {l.label}
                  <ChevronLeft className="size-4 opacity-50" aria-hidden="true" />
                </a>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenAdmin?.();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-3 text-sm font-bold text-white"
              >
                <ShieldCheck className="size-4 text-glow" /> لوحة التحكم الإدارية
              </button>
            </li>

            <li>
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="btn-shine mt-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-ember to-blaze px-4 py-3.5 text-sm font-bold text-cream"
              >
                {data.nav.ctaLabel} — خصم 30%
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
