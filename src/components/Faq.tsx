import { useState } from "react";
import { Plus, MessageCircle } from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";
import { useSite } from "../store/siteStore";

export default function Faq() {
  const { data, waLink } = useSite();
  const sec = data.faqSection;
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-sand/60 py-20 sm:py-28">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow>{sec.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-xl text-3xl font-extrabold leading-[1.25] text-ink sm:text-5xl">
            {sec.title1}
            <span className="text-gradient">{sec.titleGrad}</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {sec.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q + i} delay={Math.min(i, 4) * 90}>
                <div className={`overflow-hidden rounded-2xl border transition-all duration-500 ${isOpen ? "border-ember/30 bg-parchment shadow-lift" : "border-ink/[0.07] bg-parchment/70 hover:border-ember/20 hover:bg-parchment"}`}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-panel-${i}`} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start">
                    <span className="text-base font-extrabold text-ink sm:text-lg">{f.q}</span>
                    <span className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${isOpen ? "rotate-45 bg-gradient-to-br from-ember to-blaze text-cream shadow-warm" : "bg-ink/[0.06] text-ink"}`} aria-hidden="true">
                      <Plus className="size-4.5" strokeWidth={2.5} />
                    </span>
                  </button>
                  <div className={`acc ${isOpen ? "open" : ""}`} id={`faq-panel-${i}`} role="region">
                    <div>
                      <p className="px-6 pb-6 leading-8 text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-ember/20 bg-gradient-to-l from-ember/[0.07] to-glow/[0.07] p-7 text-center sm:flex-row sm:text-start">
            <div>
              <p className="text-lg font-extrabold text-ink">{sec.helpTitle}</p>
              <p className="mt-1 text-sm text-ink-soft">{sec.helpDesc}</p>
            </div>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]">
              <MessageCircle className="size-4.5" aria-hidden="true" />
              {sec.helpCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
