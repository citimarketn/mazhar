import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { useSite } from "../store/siteStore";
import { IconByName } from "../store/icons";

export default function Showcase() {
  const { data } = useSite();
  const sec = data.showcase;
  const [active, setActive] = useState(0);

  return (
    <section id="product" className="grain relative overflow-hidden bg-night py-20 text-cream sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 start-1/4 size-[30rem] rounded-full bg-ember/20 blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-[-8rem] end-[-6rem] size-[26rem] rounded-full bg-glow/12 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.06] px-4 py-1.5 text-sm font-semibold text-glow backdrop-blur">
            <span className="size-1.5 rounded-full bg-glow" />
            {sec.eyebrow}
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-[1.25] sm:text-5xl">
            {sec.title}
            <span className="text-gradient">{sec.titleGradient}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cream/70">{sec.desc}</p>
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal variant="scale">
            <figure className="relative overflow-hidden rounded-[2rem] ring-1 ring-cream/10 shadow-lift">
              <img key={active} src={sec.gallery[active]?.src} alt={sec.gallery[active]?.alt} className="aspect-[4/3] w-full object-cover animate-fade-swap" />
              <figcaption className="glass-dark absolute bottom-5 start-5 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-cream">
                <Check className="size-4 text-glow" aria-hidden="true" />
                {sec.gallery[active]?.caption}
              </figcaption>
            </figure>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={120}>
              <div className="grid grid-cols-4 gap-3 lg:grid-cols-2" role="tablist" aria-label="صور المنتج">
                {sec.gallery.map((g, i) => (
                  <button
                    key={g.src + i}
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-400 ${active === i ? "ring-2 ring-glow ring-offset-2 ring-offset-night scale-[1.02]" : "opacity-60 hover:opacity-100 hover:scale-[1.02]"}`}
                  >
                    <img src={g.src} alt="" aria-hidden="true" className="aspect-square w-full object-cover lg:aspect-[4/3]" loading="lazy" />
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-3">
              {sec.specs.map((sp, i) => (
                <Reveal key={sp.k + i} delay={180 + i * 80}>
                  <div className="glass-dark group flex items-center gap-3 rounded-2xl p-4 transition-all duration-400 hover:bg-cream/[0.09] hover:ring-1 hover:ring-glow/30">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-ember/25 to-glow/25 text-glow transition-transform duration-400 group-hover:scale-110">
                      <IconByName name={sp.icon} className="size-5" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-base font-extrabold text-cream">{sp.k}</span>
                      <span className="block text-xs text-cream/60">{sp.v}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
