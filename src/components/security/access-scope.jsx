"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BanIcon, ShieldCheck } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pair 01 — Access, as one split argument rather than two boxes.
 *
 * A single hairline divides the deal that is in reach from the boundary
 * around it, the same seam ControlBoundary already draws elsewhere on the
 * site. Rows fade and rise on scroll; nothing is a bordered, shadowed panel.
 */
export function AccessScope({ deal, shot, outside, rules }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();
    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;

      const cleanups = [];
      const seam = root.querySelector(".sec-pair-seam");
      const line = root.querySelector(".as-deal-line");
      const frame = root.querySelector(".as-frame");

      const tl = gsap.timeline({ paused: true });
      if (seam) tl.to(seam, { scaleY: 1, duration: 0.9, ease: "power2.inOut" }, 0);
      if (line) tl.to(line, { scaleX: 1, duration: 0.6, ease: "power3.out" }, 0.1);
      if (frame) {
        tl.fromTo(frame, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.inOut" }, 0.18);
      }
      const trigger = ScrollTrigger.create({ trigger: root, start: "top 82%", animation: tl });
      cleanups.push(() => { trigger.kill(); tl.kill(); });

      const outRows = gsap.utils.toArray(".as-out-row", root);
      if (outRows.length) {
        const rowTl = gsap.timeline({ paused: true });
        rowTl.fromTo(outRows, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.46, ease: "power3.out", stagger: 0.06 }, 0);
        const t = ScrollTrigger.create({ trigger: outRows[0], start: "top 88%", animation: rowTl });
        cleanups.push(() => { t.kill(); rowTl.kill(); });
      }

      const ruleRows = gsap.utils.toArray(".as-rule", root);
      if (ruleRows.length) {
        const ruleTl = gsap.timeline({ paused: true });
        ruleTl.fromTo(ruleRows, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.46, ease: "power3.out", stagger: 0.06 }, 0);
        const t = ScrollTrigger.create({ trigger: ruleRows[0], start: "top 88%", animation: ruleTl });
        cleanups.push(() => { t.kill(); ruleTl.kill(); });
      }

      return () => cleanups.forEach((fn) => fn());
    });

    return () => media.revert();
  }, []);

  return (
    <div className="sec-pair as" ref={scope}>
      <div className="as-scope">
        <p className="as-deal">
          {deal.name}
          <span className="as-deal-line" aria-hidden="true" />
        </p>
        <span className="as-deal-ref hx-mono">{deal.ref}</span>

        <div className="as-frame">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(max-width: 900px) 92vw, 46vw"
          />
        </div>
        <p className="as-meta hx-mono">{deal.meta}</p>
      </div>

      <span className="sec-pair-seam" aria-hidden="true" />

      <div className="as-boundary">
        <p className="sec-eyebrow hx-mono">Never reachable</p>
        <ul className="as-out-list">
          {outside.map((item) => (
            <li className="as-out-row" key={item}>
              <BanIcon className="as-out-icon" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="as-rules-k hx-mono">Standing rules</p>
        <ol className="as-rules">
          {rules.map((item) => (
            <li className="as-rule" key={item}>
              <ShieldCheck className="as-rule-icon" />
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
