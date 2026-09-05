"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayersIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pair 03 — Data lifecycle, as one split argument.
 *
 * Left: the four surfaces, a ruled register with a clock trailing each row.
 * Right: the custody chain, drawn as a single line down the margin that
 * extends as the reader scrolls, lighting each holder's node as the line
 * reaches it — a scroll-scrubbed diagram rather than another list, because
 * the chain having one continuous line is the entire point being made.
 */
export function DataLifecycle({ surfaces, holders, terminus }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();
    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const cleanups = [];
      const seam = root.querySelector(".sec-pair-seam");
      if (seam) {
        const tl = gsap.to(seam, { scaleY: 1, duration: 0.9, ease: "power2.inOut", paused: true });
        const t = ScrollTrigger.create({ trigger: root, start: "top 82%", animation: tl });
        cleanups.push(() => { t.kill(); tl.kill(); });
      }

      const rows = gsap.utils.toArray(".dl-row", root);
      if (rows.length) {
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(rows, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.07 }, 0);
        const t = ScrollTrigger.create({ trigger: rows[0], start: "top 88%", animation: tl });
        cleanups.push(() => { t.kill(); tl.kill(); });
      }

      // The custody line: one path, scrubbed to the reader's position through
      // the chain rather than played once on entry — the drawing itself is
      // what stands for "the chain", so it should track how far through it
      // the reader actually is.
      const custody = root.querySelector(".dl-custody");
      const drawPath = root.querySelector(".dl-svg-draw");
      const dots = gsap.utils.toArray(".dl-chain-dot", root);
      const names = gsap.utils.toArray(".dl-chain-name, .dl-chain-what", root);

      if (custody && drawPath) {
        gsap.set(drawPath, { strokeDashoffset: 1 });
        gsap.set(names, { autoAlpha: 0, y: 10 });

        const st = ScrollTrigger.create({
          trigger: custody,
          start: "top 76%",
          end: "bottom 70%",
          scrub: 0.4,
          onUpdate: (self) => {
            gsap.set(drawPath, { strokeDashoffset: 1 - self.progress });
            dots.forEach((dot, i) => dot.classList.toggle("is-lit", self.progress >= (i + 0.15) / dots.length));
          },
        });
        cleanups.push(() => st.kill());

        const revealTl = gsap.timeline({ paused: true });
        revealTl.to(names, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }, 0);
        const t = ScrollTrigger.create({ trigger: custody, start: "top 84%", animation: revealTl });
        cleanups.push(() => { t.kill(); revealTl.kill(); });
      }

      const terminusEl = root.querySelector(".dl-terminus");
      if (terminusEl) {
        const tl = gsap.fromTo(
          terminusEl,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", paused: true },
        );
        const t = ScrollTrigger.create({ trigger: terminusEl, start: "top 90%", animation: tl });
        cleanups.push(() => { t.kill(); tl.kill(); });
      }

      return () => cleanups.forEach((fn) => fn());
    });

    return () => media.revert();
  }, []);

  return (
    <div className="sec-pair dl" ref={scope}>
      <div className="dl-surfaces">
        <p className="sec-eyebrow hx-mono">Where a document rests</p>
        <ol className="dl-surfaces-list">
          {surfaces.map((surface, i) => (
            <li className="dl-row" key={surface.name}>
              <span className="dl-row-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="dl-row-name">{surface.name}</p>
                <p className="dl-row-what">{surface.what}</p>
                <span className="dl-row-clock hx-mono">{surface.clock}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <span className="sec-pair-seam" aria-hidden="true" />

      <div>
        <p className="sec-eyebrow hx-mono">Who&rsquo;s in the chain</p>

        <div className="dl-custody">
          <svg className="dl-svg" viewBox="0 0 16 1000" preserveAspectRatio="none" aria-hidden="true">
            <path className="dl-svg-base" d="M8 0 L8 1000" pathLength="1" />
            <path className="dl-svg-draw" d="M8 0 L8 1000" pathLength="1" />
          </svg>

          <ol className="dl-chain-list">
            {holders.map((holder, i) => (
              <li className="dl-chain-row" key={holder.name}>
                <span className="dl-chain-dot" aria-hidden="true" />
                <span className="dl-chain-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
                <p className="dl-chain-name">{holder.name}</p>
                <p className="dl-chain-what">{holder.what}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="dl-terminus">
          <span className="dl-terminus-k hx-mono">
            <LayersIcon className="dl-terminus-icon" /> Terminus
          </span>
          <p className="dl-terminus-name">{terminus.name}</p>
          <p className="dl-terminus-what">{terminus.what}</p>
        </div>
      </div>
    </div>
  );
}
