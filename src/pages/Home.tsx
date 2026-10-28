import { memo, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./Home.scss";

const BEST_SELLERS = [
  {
    id: "b1",
    name: "Double Chocolate",
    price: 1400,
    img: "/images/carrot cupcake.webp",
    tag: "Best Seller",
    rotate: -6,
    delay: 100,
    position: "top-left",
  },
  {
    id: "b2",
    name: "Sea Salt Cookie",
    price: 1000,
    img: "/images/banana bread.jpg",
    tag: "Fan Favourite",
    rotate: 4,
    delay: 300,
    position: "top-right",
  },
  {
    id: "b3",
    name: "Classic Vanilla",
    price: 1200,
    img: "/images/double chcoc bronie copy.jpg",
    tag: "Freshly Baked",
    rotate: -3,
    delay: 500,
    position: "bottom-center",
  },
];

// Clean, specific copy — no icons
const FEATURES = [
  { title: "Baked daily", text: "Out of the oven by 6am, every single morning." },
  { title: "Small batches", text: "Handmade in limited quantities — never mass-produced." },
  { title: "Made by hand", text: "No preservatives. Just real ingredients and real care." },
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

const Arrow = memo(({ direction = "right" }: { direction?: "right" | "down" }) => (
  <svg
    className="arrow"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    style={{ transform: direction === "down" ? "rotate(90deg)" : undefined }}
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
Arrow.displayName = "Arrow";

const Home = () => {
  const [featuresRef, featuresIn] = useInView<HTMLElement>(0.25);

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
              <span className="btn__chip" aria-hidden="true">
                <Arrow />
                <Arrow />
              </span>
            </a>
            <a href="#about" className="btn btn--ghost">
              Our Story
              <Arrow direction="down" />
            </a>
          </div>
        </div>

        <div className="hero__visual-new">
          {BEST_SELLERS.map((item, i) => (
            <a
              key={item.id}
              href="#menu"
              className={`hero-card hero-card--${item.position}`}
              style={{
                "--rotate": `${item.rotate}deg`,
                "--delay": `${item.delay}ms`,
                "--i": i,
              } as CSSProperties}
              aria-label={`View ${item.name} in menu`}
            >
              <div className="hero-card__image-wrap">
                <img
                  src={item.img}
                  alt={item.name}
                  className="hero-card__image"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  width={200}
                  height={200}
                />
              </div>
              <div className="hero-card__content">
                <span className="hero-card__tag">{item.tag}</span>
                <h4 className="hero-card__name">{item.name}</h4>
                <span className="hero-card__price">Rs. {item.price}</span>
              </div>
            </a>
          ))}
          
          <div className="hero-visual__glow" aria-hidden="true" />
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