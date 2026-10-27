
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./About.scss";

const IMAGES = [
  { src: "/images/aboutsection.webp", alt: "Hands kneading dough on a floured wooden table" },
//   { src: "/images/about-2.webp", alt: "Fresh pastries and cupcakes on a wooden board" },
//   { src: "/images/about-3.webp", alt: "A tray of freshly baked brownies" },
];

const STATS = [
  { label: "Since", value: "2013" },
  { label: "Focus", value: "Hygiene & quality" },
];

const IMAGE_MS = 2200;

const useInView = <T extends HTMLElement>(threshold = 0.2) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
};

const About = () => {
  const [ref, inView] = useInView<HTMLElement>(0.2);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % IMAGES.length);
    }, IMAGE_MS);
    
    return () => window.clearInterval(id);
  }, [inView]);

  return (
    <section id="about" ref={ref} className={`about container ${inView ? "is-in" : ""}`}>
      <div className="about__grid">
        <div className="about__media" style={{ "--i": 0 } as CSSProperties}>
          <figure className="about__visual">
            {IMAGES.map((img, i) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={720}
                height={900}
                loading={i === 0 ? "eager" : "lazy"} 
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                draggable={false}
                className={`about__image ${i === active ? "is-active" : ""}`}
                aria-hidden={i !== active}
              />
            ))}
            {/* <figcaption className="about__caption">Made fresh in our kitchen, daily.</figcaption> */}
          </figure>
        </div>

        <div className="about__content">
          <p className="about__eyebrow" style={{ "--i": 1 } as CSSProperties}>Our Story</p>
          <h2 className="about__title" style={{ "--i": 2 } as CSSProperties}>
            Since 2013,<br /><span className="about__accent">baked with care.</span>
          </h2>
          <p className="about__lead" style={{ "--i": 3 } as CSSProperties}>
            Since 2013, MAFS Bakers has been delivering fresh, homemade treats with the highest standards of hygiene and quality. Our mission is simple: to make every bite delightful.
          </p>
          <p className="about__body" style={{ "--i": 4 } as CSSProperties}>
            From rich brownies and artisanal cupcakes to soft loaf cakes, signature pastries, and delicious frozen snacks, every item at MAFS Bakers is crafted with care to bring you the perfect homemade taste.
          </p>
          <blockquote className="about__quote" style={{ "--i": 5 } as CSSProperties}>
            “Every bite should feel like it was made just for you.”
          </blockquote>
          <div className="about__stats" style={{ "--i": 6 } as CSSProperties}>
            {STATS.map((s) => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-label">{s.label}</span>
                <span className="about__stat-value">{s.value}</span>
              </div>
            ))}
          </div>
          <a href="#contact" className="btn btn--primary about__cta" style={{ "--i": 7 } as CSSProperties}>
            <span>Visit us</span>
            <span className="btn__chip" aria-hidden="true">
              <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;