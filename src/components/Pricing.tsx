import { Check, Sparkles, ChevronLeft } from "lucide-react";
import { Eyebrow, Reveal, useInView } from "./Reveal";
import { useSite } from "../store/siteStore";
import { IconByName } from "../store/icons";

function StockBar({ text, percent }: { text: string; percent: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  return (
    <div ref={ref} className="mx-auto mt-10 max-w-md">
      <div className="flex items-center justify-between text-sm font-bold">
        <span className="text-ink-soft">الطلبات تتسارع في محافظات مصر…</span>
        <span className="text-ember">{text}</span>
      </div>
      <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full origin-right rounded-full bg-gradient-to-l from-ember to-glow transition-[width] duration-[1.6s] ease-out"
          style={{ width: inView ? `${percent}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function Pricing({
  onOrder,
}: {
  onOrder?: (plan: string, total: number) => void;
}) {
  const { data, waLink } = useSite();
  const sec = data.pricingSection;
  return (
    <section id="pricing" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 end-[-8rem] size-[24rem] rounded-full bg-ember/12 blur-[110px] animate-blob" />
        <div className="absolute bottom-0 start-[-10rem] size-[26rem] rounded-full bg-glow/15 blur-[120px] animate-blob [animation-delay:-9s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <Eyebrow>{sec.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-[1.25] text-ink sm:text-5xl">
            {sec.title1} <span className="text-gradient">{sec.titleGrad}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-ink-soft">
            {sec.desc}
          </p>
        </Reveal>

        {sec.stockEnabled && (
          <Reveal delay={140}>
            <StockBar text={sec.stockText} percent={sec.stockPercent} />
          </Reveal>
        )}

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
          {sec.plans.map((p, i) => (
            <Reveal key={p.name + i} delay={i * 140} variant="up" className="h-full">
              {p.featured ? (
                <div className="relative h-full rounded-[2rem] bg-gradient-to-br from-ember via-blaze to-glow p-[2.5px] shadow-lift lg:-my-3">
                  <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-ink px-5 py-1.5 text-xs font-extrabold text-glow shadow-lift whitespace-nowrap">
                    <Sparkles className="me-1 inline size-3.5 align-[-2px]" aria-hidden="true" />
                    الأكثر مبيعًا في مصر هذا الأسبوع
                  </span>
                  <PlanCard p={p} highlight waLink={waLink} onOrder={onOrder} />
                </div>
              ) : (
                <div className="h-full rounded-[2rem] border border-ink/[0.08] bg-parchment shadow-sm transition-shadow duration-500 hover:shadow-lift">
                  <PlanCard p={p} waLink={waLink} onOrder={onOrder} />
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {sec.trustRow.map((t) => (
              <li
                key={t.text}
                className="flex items-center gap-2.5 text-sm font-bold text-ink-soft"
              >
                <span className="grid size-9 place-items-center rounded-full bg-ember/10 text-ember">
                  <IconByName name={t.icon} className="size-4.5" />
                </span>
                {t.text}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function PlanCard({
  p,
  highlight = false,
  waLink,
  onOrder,
}: {
  p: any;
  highlight?: boolean;
  waLink: (plan?: string) => string;
  onOrder?: (plan: string, total: number) => void;
}) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[calc(2rem-2.5px)] p-8 ${
        highlight ? "bg-parchment" : "bg-transparent"
      }`}
    >
      <h3 className="text-xl font-extrabold text-ink">{p.name}</h3>
      <p className="mt-1 text-sm font-semibold text-ink-soft">{p.tagline}</p>

      <div className="mt-6 flex items-end gap-3">
        <p className="text-5xl font-black tabular-nums text-ink">
          {p.now}
          <span className="ms-1.5 align-middle text-base font-bold text-ember">
            جنيه
          </span>
        </p>
        <p className="pb-1.5 text-lg font-bold text-ink-soft/60 line-through tabular-nums">
          {p.old}
        </p>
        <span className="mb-1.5 rounded-full bg-ember/10 px-3 py-1 text-xs font-extrabold text-ember">
          وفّري {p.old - p.now} جنيه
        </span>
      </div>

      <ul className="mt-7 flex-1 space-y-3.5">
        {p.features.map((f: string) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm font-semibold leading-7 text-ink"
          >
            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ember to-blaze text-cream">
              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid grid-cols-1 gap-3">
        {onOrder && (
          <button
            onClick={() => onOrder(p.name, p.now)}
            className={`btn-shine flex items-center justify-center gap-2 rounded-full py-4 text-sm font-black text-white shadow-warm transition-transform hover:scale-[1.02] ${
              highlight
                ? "bg-gradient-to-l from-ember to-blaze"
                : "bg-ink hover:bg-cocoa"
            }`}
          >
            حجز فوري بالاسم والمحافظة
            <ChevronLeft className="size-4" />
          </button>
        )}
        <a
          href={waLink(p.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 py-3 text-xs font-bold text-ink-soft hover:bg-parchment hover:text-ink transition"
        >
          طلب واستفسار عبر الواتساب (0102177690)
        </a>
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-ink-soft">
        شحن مجاني لجميع المحافظات • الدفع عند المعاينة
      </p>
    </article>
  );
}
