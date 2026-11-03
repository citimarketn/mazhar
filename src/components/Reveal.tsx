import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "scale" | "blur" | "start";
  style?: CSSProperties;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  style,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const variantClass = variant === "fade" ? "" : `rv-${variant}`;
  return (
    <div
      ref={ref}
      className={`rv ${variantClass} ${inView ? "rv-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* Animated counter — counts up when scrolled into view */
export function CountUp({
  to,
  decimals = 0,
  duration = 1700,
  suffix = "",
  className = "",
}: {
  to: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* Countdown to midnight — urgency, resets daily */
export function useCountdown() {
  const calc = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    const diff = Math.max(0, end.getTime() - now.getTime());
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1000);
    const pad = (n: number) => String(n).padStart(2, "0");
    return { h: pad(h), m: pad(m), s: pad(s) };
  };
  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/* Section eyebrow chip — consistent visual rhythm */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ember/25 bg-ember/[0.08] px-4 py-1.5 text-sm font-semibold text-ember">
      <span className="size-1.5 rounded-full bg-gradient-to-r from-ember to-glow" />
      {children}
    </span>
  );
}

/* Row of 5 stars */
export function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-glow" aria-label="تقييم 5 من 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12 2l2.9 6.26 6.6.7-4.9 4.5 1.35 6.54L12 16.9 6.05 20l1.35-6.54-4.9-4.5 6.6-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}
