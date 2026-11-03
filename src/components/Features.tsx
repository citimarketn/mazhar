import { Eyebrow, Reveal } from "./Reveal";
import { useSite } from "../store/siteStore";
import { IconByName } from "../store/icons";

export default function Features() {
  const { data } = useSite();
  const sec = data.featuresSection;
  return (
    <section id="features" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-ember/25 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow>{sec.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-[1.25] text-ink sm:text-5xl">
            {sec.title}
            <span className="text-gradient">{sec.titleGradient}</span>
            المثالية
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-soft">{sec.desc}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sec.items.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 120} variant="up">
              <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-ink/[0.06] bg-parchment p-8 transition-all duration-500 hover:-translate-y-2.5 hover:border-ember/25 hover:shadow-lift">
                <span aria-hidden="true" className="absolute -end-14 -top-14 size-36 rounded-full bg-gradient-to-br from-ember/15 to-glow/15 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
                <span className="relative inline-grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-ember/12 to-glow/12 text-ember ring-1 ring-ember/15 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:from-ember group-hover:to-blaze group-hover:text-cream group-hover:shadow-warm">
                  <IconByName name={f.icon} className="size-6" strokeWidth={1.9} />
                </span>
                <h3 className="mt-6 text-xl font-extrabold text-ink">{f.title}</h3>
                <p className="mt-3 leading-8 text-ink-soft">{f.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
