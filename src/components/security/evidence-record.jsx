"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, ClockOutline } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Pair 02 — Evidence, as one split argument.
 *
 * Left: the questionnaire as a status list, a tally ticking up above it.
 * Right: one override, written the way a correction actually reads — the
 * prior line struck by a rule that draws across it, then the replacement
 * arriving at size underneath. The strike is the same gesture BoundaryLines
 * already uses on the Why Cevrynt page, not a new one invented for this row.
 */
export function EvidenceRecord({ items, record }) {
  const scope = useRef(null);
  const settled = items.filter((item) => item.stated).length;

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

      const tallyN = root.querySelector(".ev-tally-n");
      if (tallyN) {
        const counter = { n: 0 };
        const tl = gsap.to(counter, {
          n: settled,
          duration: 0.7,
          ease: "power2.out",
          paused: true,
          onUpdate: () => { tallyN.textContent = String(Math.round(counter.n)); },
        });
        const t = ScrollTrigger.create({ trigger: root, start: "top 85%", animation: tl });
        cleanups.push(() => { t.kill(); tl.kill(); });
      }

      const rows = gsap.utils.toArray(".ev-row", root);
      if (rows.length) {
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(rows, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.46, ease: "power3.out", stagger: 0.055 }, 0);
        const t = ScrollTrigger.create({ trigger: rows[0], start: "top 88%", animation: tl });
        cleanups.push(() => { t.kill(); tl.kill(); });
      }

      const change = root.querySelector(".ev-change");
      if (change) {
        const field = change.querySelector(".ev-field");
        const strike = change.querySelector(".ev-was-line");
        const now = change.querySelector(".ev-now");
        const by = change.querySelector(".ev-by");
        const reason = change.querySelector(".ev-reason");

        gsap.set([now, by, reason].filter(Boolean), { autoAlpha: 0, y: 14 });
        if (field) gsap.set(field, { autoAlpha: 0, y: 10 });

        const tl = gsap.timeline({ paused: true });
        if (field) tl.to(field, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0);
        if (strike) tl.fromTo(strike, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, 0.16);
        tl.to([now, by].filter(Boolean), { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08 }, 0.62);
        if (reason) tl.to(reason, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.86);

        const t = ScrollTrigger.create({ trigger: change, start: "top 82%", animation: tl });
        cleanups.push(() => { t.kill(); tl.kill(); });
      }

      return () => cleanups.forEach((fn) => fn());
    });

    return () => media.revert();
  }, [settled]);

  return (
    <div className="sec-pair ev" ref={scope}>
      <div className="ev-status">
        <p className="sec-eyebrow hx-mono">The questionnaire</p>
        <div className="ev-tally">
          <span className="ev-tally-n">{settled}</span>
          <span className="ev-tally-t hx-mono">of {items.length} answered here</span>
        </div>

        <ul className="ev-list">
          {items.map((item) => (
            <li className={`ev-row ${item.stated ? "is-set" : "is-open"}`} key={item.q}>
              {item.stated ? <CheckCircle className="ev-icon" /> : <ClockOutline className="ev-icon" />}
              <div>
                <p className="ev-q">{item.q}</p>
                {item.stated ? (
                  <p className="ev-a">{item.a}</p>
                ) : (
                  <p className="ev-when">
                    <span className="ev-when-k hx-mono">Closes</span> {item.when}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <span className="sec-pair-seam" aria-hidden="true" />

      <div className="ev-change">
        <p className="sec-eyebrow hx-mono">One override, as recorded</p>
        <span className="ev-field">{record.field}</span>

        <p className="ev-was">
          {record.was}
          <span className="ev-was-line" aria-hidden="true" />
        </p>
        <p className="ev-now">{record.now}</p>
        <p className="ev-by hx-mono">{record.by} · {record.at}</p>

        <div className="ev-reason">
          <span className="ev-reason-k hx-mono">Reason given</span>
          <p>{record.reason}</p>
        </div>
      </div>
    </div>
  );
}
