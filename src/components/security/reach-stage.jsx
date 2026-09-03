"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import {
  Lift,
  Stamp,
  armMarks,
  disarm,
  isBelowFold,
  lift,
  playOnEnter,
  rule,
  ruleDown,
  settle,
  stamp,
  strike,
} from "@/components/security/marks";

/**
 * 01 Reach, as the scope sheet at the front of a file.
 *
 * Scoping a review is crossing things off a list, so that is what this is: one
 * ruled sheet, the deal that was sent named on the left with the Intake screen
 * it produced, and on the right the things a lender assumes a vendor quietly
 * reaches. The named deal lifts out from under its bar. The other four are
 * struck through, one after another, and drop back.
 *
 * Nothing is invented here. The list on the right is the list of things this
 * product has no connection to, and the four rules under the sheet restate how
 * a review already works rather than promising anything new.
 */
export function ReachStage({ deal, shot, outside, rules }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;
      // A sheet the reader is already looking at keeps its resting state.
      if (!isBelowFold(root)) return undefined;

      const parts = armMarks(root);
      const dealBar = root.querySelector(".sc-deal .mk-bar");
      const dealWash = root.querySelector(".sc-deal .mk-wash");
      const struck = gsap.utils.toArray(".sc-out-item", root);
      const frame = root.querySelector(".sc-frame");
      const ruleRows = gsap.utils.toArray(".sc-rule", root);

      gsap.set(frame, { autoAlpha: 0, y: 16 });
      gsap.set(ruleRows, { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({ paused: true });

      // The sheet is ruled up before anything is written on it: the column
      // rules first, then the boundary down the middle of it.
      rule(tl, parts.rules, 0, { run: 0.62, stagger: 0.08 });
      ruleDown(tl, parts.rulesV, 0.1, { run: 0.78 });
      stamp(tl, root.querySelectorAll(".sc-col .mk-stamp"), 0.18, { stagger: 0.1 });

      // Then the deal is named.
      if (dealBar) lift(tl, dealBar, 0.34, { wash: dealWash });
      stamp(tl, root.querySelectorAll(".sc-ref, .sc-meta"), 0.62, { stagger: 0.1 });
      tl.to(frame, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.5);

      // And then everything else is crossed off, in order, after it.
      struck.forEach((row, i) => strike(tl, row, 0.74 + i * 0.11));

      stamp(tl, root.querySelector(".sc-rules-k"), 1.18);
      tl.to(ruleRows, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out", stagger: 0.08 }, 1.24);

      settle(tl, parts);

      const stop = playOnEnter(root, tl, { start: "top 74%" });

      return () => {
        stop();
        disarm(root, parts);
      };
    });

    return () => media.revert();
  }, []);

  return (
    <figure className="sc" ref={scope}>
      <div className="sc-sheet">
        <div className="sc-in">
          <p className="sc-col">
            <Stamp>In scope</Stamp>
            <span className="sc-col-n hx-mono">01 entry</span>
          </p>

          <p className="sc-deal">
            <Lift wash>{deal.name}</Lift>
          </p>
          <Stamp className="sc-ref">{deal.ref}</Stamp>

          <div className="sc-frame">
            <Image
              className="sc-img"
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(max-width: 900px) 92vw, 58vw"
            />
          </div>

          <Stamp className="sc-meta">{deal.meta}</Stamp>
        </div>

        {/* The rule between the halves is the boundary. It is a table rule,
            drawn once, rather than a device. */}
        <span className="mk-rule mk-rule-v sc-seam" aria-hidden="true" />

        <div className="sc-out">
          <p className="sc-col sc-col-out">
            <Stamp>Not reachable</Stamp>
            <span className="sc-col-n hx-mono">{String(outside.length).padStart(2, "0")} struck</span>
          </p>

          <ul className="sc-out-list">
            {outside.map((item) => (
              <li className="sc-out-item mk-x" key={item}>
                <span className="sc-out-t">{item}</span>
                <span className="sc-out-x" aria-hidden="true" />
              </li>
            ))}
          </ul>

          {/* The rules sit under the struck list rather than under the sheet:
              they are why those four are struck, and putting them here fills
              the column against the evidence on the other side of the seam. */}
          <div className="sc-rules">
            <Stamp className="sc-rules-k">Standing rules</Stamp>
            <ol className="sc-rules-list">
              {rules.map((item, i) => (
                <li className="sc-rule" key={item}>
                  <span className="sc-rule-n hx-mono">{`R${String(i + 1).padStart(2, "0")}`}</span>
                  <span className="sc-rule-t">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </figure>
  );
}
