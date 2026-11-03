import { CountUp, Reveal } from "./Reveal";
import { useSite } from "../store/siteStore";
import { IconByName } from "../store/icons";

export default function SocialProof() {
  const { data } = useSite();
  const MARQUEE = data.socialProof.marquee;
  const STATS = data.socialProof.stats;
  return (
    <section aria-label="الإثبات الاجتماعي" className="relative">
      <div className="marquee relative overflow-hidden bg-gradient-to-l from-cocoa via-night to-cocoa py-3.5">
        <div className="marquee-track flex w-max items-center gap-10 pe-10">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} aria-hidden={i >= MARQUEE.length ? true : undefined} className="flex items-center gap-2.5 text-sm font-bold whitespace-nowrap text-cream/90">
              <IconByName name={m.icon} className="size-4 text-glow" />
              {m.text}
              <span className="ms-6 inline-block size-1.5 rounded-full bg-ember/70" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <div className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 110}>
              <div className="group relative text-center">
                <p className="text-4xl font-extrabold text-ink sm:text-5xl lg:text-[3.4rem]">
                  <CountUp to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} className="text-gradient" />
                </p>
                <p className="mt-2 text-base font-bold text-ink">{s.label}</p>
                <p className="mt-1 text-sm text-ink-soft">{s.note}</p>
                <span aria-hidden="true" className="mx-auto mt-4 block h-1 w-10 rounded-full bg-gradient-to-l from-ember to-glow transition-all duration-500 group-hover:w-20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
