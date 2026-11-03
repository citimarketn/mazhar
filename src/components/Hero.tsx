import { useRef } from "react";
import { ChevronLeft, AlarmClockCheck } from "lucide-react";
import { Reveal, Stars, useCountdown } from "./Reveal";
import { useSite } from "../store/siteStore";
import { IconByName } from "../store/icons";

export default function Hero() {
  const { data } = useSite();
  const tiltRef = useRef<HTMLDivElement>(null);
  const { h, m, s } = useCountdown();
  const hero = data.hero;

  const onMove = (e: React.MouseEvent) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * -9}deg) rotateX(${y * 8}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    const el = tiltRef.current;
    if (el) el.style.transform = "perspective(1100px) rotateY(0) rotateX(0)";
  };

  return (
    <section id="top" className="grain relative overflow-hidden bg-cream pt-36 pb-16 sm:pt-40 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 start-[-12rem] size-[36rem] rounded-full bg-glow/25 blur-[110px] animate-blob" />
        <div className="absolute top-1/3 end-[-14rem] size-[32rem] rounded-full bg-rose/20 blur-[120px] animate-blob [animation-delay:-8s]" />
        <div className="absolute bottom-[-10rem] start-1/3 size-[28rem] rounded-full bg-ember/15 blur-[100px] animate-blob [animation-delay:-14s]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
        <div className="text-center lg:text-start">
          <Reveal delay={0}>
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-ember/20 bg-parchment/70 py-1.5 ps-3 pe-4 shadow-sm backdrop-blur">
              <Stars />
              <span className="text-sm font-semibold text-ink">
                4.9/5 <span className="text-ink-soft font-medium">{hero.ratingText}</span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.12] font-extrabold text-ink sm:text-6xl lg:text-[4.2rem]">
              {hero.titleLine1}
              <br />
              <span className="text-gradient">{hero.titleGradient}</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-9 text-ink-soft lg:mx-0">{hero.description}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a href="#pricing" className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-ember to-blaze px-9 py-4 text-base font-bold text-cream shadow-warm transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02] sm:w-auto">
                {hero.primaryCta}
                <ChevronLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-1.5" aria-hidden="true" />
              </a>
              <a href="#features" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/15 bg-parchment/60 px-9 py-4 text-base font-bold text-ink backdrop-blur transition-all duration-300 hover:border-ember/40 hover:bg-parchment hover:text-ember sm:w-auto">
                {hero.secondaryCta}
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
              {hero.trustItems.map((t) => (
                <li key={t.label} className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                  <IconByName name={t.icon} className="size-4.5 text-ember" />
                  {t.label}
                </li>
              ))}
            </ul>
          </Reveal>

          {hero.countdownEnabled && (
            <Reveal delay={420}>
              <div className="mx-auto mt-8 inline-flex items-center gap-4 rounded-2xl border border-ember/20 bg-gradient-to-l from-ember/[0.07] to-glow/[0.07] px-5 py-3 lg:mx-0">
                <AlarmClockCheck className="size-6 text-ember animate-tick" aria-hidden="true" />
                <div className="text-start">
                  <p className="text-xs font-semibold text-ink-soft">{hero.countdownLabel}</p>
                  <p className="text-2xl font-extrabold tabular-nums text-ink" dir="ltr" aria-live="off">
                    {h}<span className="text-ember animate-tick">:</span>{m}<span className="text-ember animate-tick">:</span>{s}
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={200} variant="scale" className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-none" onMouseMove={onMove} onMouseLeave={onLeave}>
            <div aria-hidden="true" className="absolute inset-6 -z-10 rounded-full bg-gradient-to-tr from-ember/45 via-blaze/35 to-glow/40 blur-3xl animate-pulse-glow" />
            <div ref={tiltRef} className="tilt relative">
              <div className="overflow-hidden rounded-[2.5rem] border border-white/60 shadow-lift ring-1 ring-ink/5">
                <img src={hero.heroImage} alt={hero.heroImageAlt} className="aspect-[4/5] w-full object-cover" loading="eager" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink/25 to-transparent" />
              </div>
              {hero.ribbonEnabled && (
                <div className="absolute -top-4 end-6 rounded-full bg-gradient-to-l from-ember to-blaze px-5 py-2 text-sm font-extrabold text-cream shadow-warm rotate-[-4deg]">{hero.ribbonText}</div>
              )}
              <div className="glass absolute bottom-6 start-6 rounded-2xl px-5 py-3 shadow-lift">
                <p className="text-xs font-semibold text-ink-soft">{hero.priceLabel}</p>
                <p className="text-2xl font-extrabold text-ink">
                  {hero.priceNow} <span className="text-sm font-bold text-ember">ر.س</span>
                  <span className="ms-2 align-middle text-sm font-semibold text-ink-soft/70 line-through">{hero.priceOld}</span>
                </p>
              </div>
            </div>

            {hero.chips[0] && (
              <div className="glass absolute -start-3 top-10 hidden items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lift animate-float sm:flex lg:-start-8">
                <span className="grid size-9 place-items-center rounded-xl bg-ember/10 text-ember">
                  <IconByName name={hero.chips[0].icon} className="size-4.5" />
                </span>
                <span className="text-sm font-bold text-ink">{hero.chips[0].label}</span>
              </div>
            )}
            {hero.chips[1] && (
              <div className="glass absolute -end-2 top-1/2 hidden items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lift animate-float-slow sm:flex lg:-end-6">
                <span className="grid size-9 place-items-center rounded-xl bg-ember/10 text-ember">
                  <IconByName name={hero.chips[1].icon} className="size-4.5" />
                </span>
                <span className="text-sm font-bold text-ink">{hero.chips[1].label}</span>
              </div>
            )}
            {hero.chips[2] && (
              <div className="glass absolute -start-2 bottom-24 hidden items-center gap-2.5 rounded-2xl px-4 py-3 shadow-lift animate-float [animation-delay:1.4s] sm:flex lg:start-[-2.5rem]">
                <span className="grid size-9 place-items-center rounded-xl bg-ember/10 text-ember">
                  <IconByName name={hero.chips[2].icon} className="size-4.5" />
                </span>
                <span className="text-sm font-bold text-ink">{hero.chips[2].label}</span>
              </div>
            )}

            <div aria-hidden="true" className="absolute -bottom-8 end-10 -z-10 size-36 rounded-full border-2 border-dashed border-ember/30 animate-spin-slower" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
