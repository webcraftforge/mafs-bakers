import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import "./Home.scss";

const SLIDES = [
  { src: "/images/hero.webp", alt: "Fresh bakes from MAFS Bakers, photo 1 of 3" },
  { src: "/images/Vanilla-Butter-Cake.1.jpg", alt: "Fresh bakes from MAFS Bakers, photo 2 of 3" },
//   { src: "/images/hero-3.webp", alt: "Fresh bakes from MAFS Bakers, photo 3 of 3" },
] as const;

const SLIDE_MS = 4200;
const SWIPE_MIN_RATIO = 0.18;

const FEATURES = [
  { title: "Baked daily", text: "Fresh from the oven, every single morning." },
  { title: "Small batches", text: "Made in small amounts, with real care." },
  { title: "Made by hand", text: "Simple recipes and honest ingredients." },
] as const;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const useInView = <T extends HTMLElement>(threshold = 0.2) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
};

const Arrow = memo(() => (
  <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));
Arrow.displayName = "Arrow";

const Home = () => {
  const [featuresRef, featuresIn] = useInView<HTMLElement>(0.25);
  const total = SLIDES.length;
  const [slide, setSlide] = useState({ cur: 0, prev: -1 });
  
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const startX = useRef<number | null>(null);
  const frameWidth = useRef(0);

  const next = useCallback(() => setSlide((s) => ({ cur: (s.cur + 1) % total, prev: s.cur })), [total]);
  const prev = useCallback(() => setSlide((s) => ({ cur: (s.cur - 1 + total) % total, prev: s.cur })), [total]);

  // Autoplay
  useEffect(() => {
    if (hovered || pressed || focused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const id = window.setInterval(next, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [hovered, pressed, focused, next]);

  // Micro-Drift Scroll Effect
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const visual = document.querySelector(".hero__float") as HTMLElement;
      if (visual && window.scrollY < 800) {
        visual.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    frameWidth.current = e.currentTarget.clientWidth || 1;
    setPressed(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    setPressed(false);

    const threshold = Math.max(40, frameWidth.current * SWIPE_MIN_RATIO);
    if (Math.abs(dx) > threshold) {
      if (dx < 0) next(); else prev();
    }
  };

  return (
    <main className="home">
      <section className="hero container">
        <div className="hero__content">
          <h1 className="hero__title" aria-label="Made for your sweet moments.">
            <span className="hero__line" aria-hidden="true">
              <span style={delay(100)}>Made for your</span>
            </span>
            <span className="hero__line" aria-hidden="true">
              <span className="hero__accent" style={delay(220)}>sweet moments.</span>
            </span>
          </h1>

          <p className="hero__description reveal" style={delay(520)}>
            From rich, chocolatey brownies to little everyday treats, find something sweet to make your day a little better.
          </p>

          <div className="hero__actions reveal" style={delay(660)}>
            <a href="#menu" className="btn btn--primary">
              <span>Discover our treats</span>
              <span className="btn__chip" aria-hidden="true"><Arrow /><Arrow /></span>
            </a>
            <a href="#about" className="btn btn--ghost">Our story</a>
          </div>
        </div>

        <div
          className="hero__visual"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }}
        >
          <div className="hero__float">
            <div
              className="hero__frame"
              onPointerDown={handleDown}
              onPointerUp={handleUp}
              onPointerCancel={() => { startX.current = null; setPressed(false); }}
            >
              {SLIDES.map((s, i) => (
                <div key={s.src} className={`slide ${i === slide.cur ? "is-active" : ""}`} aria-hidden={i !== slide.cur}>
                  <img
                    className="hero__image"
                    src={s.src}
                    alt={s.alt}
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding="async"
                    width={640}
                    height={800}
                  />
                </div>
              ))}
            </div>

            <div className="hero__badge" aria-hidden="true">
              <svg className="hero__badge-ring" viewBox="0 0 100 100">
                <defs><path id="badge-path" d="M50 50 m-39 0 a39 39 0 1 1 78 0 a39 39 0 1 1 -78 0" /></defs>
                <text><textPath href="#badge-path" textLength="245" lengthAdjust="spacing">HANDMADE • SMALL BATCH • BAKED DAILY •</textPath></text>
              </svg>
              <span className="hero__badge-core" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" ref={featuresRef} className={`features container ${featuresIn ? "is-in" : ""}`}>
        <div className="features__panel">
          {FEATURES.map((item, i) => (
            <article key={item.title} className="features__item" style={{ "--i": i } as CSSProperties}>
              <span className="features__index" aria-hidden="true">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;