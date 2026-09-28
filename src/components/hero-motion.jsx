/**
 * The hero shell every page opens on.
 *
 * The entrance used to be a GSAP timeline that ran after hydration: it hid
 * the heading, lede, actions and the product screenshot, then faded them back
 * in. On a throttled phone that held the LCP image invisible for ~6s after it
 * had downloaded, because nothing could paint until the JavaScript had run.
 *
 * The same entrance is now plain CSS (see "Hero entrance" in globals.css). It
 * starts on first paint, needs no JavaScript, animates transform and opacity
 * only, never fades the screenshot from zero, and is switched off entirely by
 * prefers-reduced-motion. So this is a server component again.
 *
 * The background is three pre-painted gradient fields that only ever move
 * (.hero-aurora) — compositor work, not paint work.
 */
export function HeroMotion({ children }) {
  return (
    <section className="home-hero">
      <div className="hero-aurora" aria-hidden="true">
        <span className="hero-aurora-a" />
        <span className="hero-aurora-b" />
        <span className="hero-aurora-c" />
      </div>
      {children}
    </section>
  );
}
