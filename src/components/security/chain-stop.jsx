"use client";

import { useEffect, useRef } from "react";
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
  settle,
  stamp,
} from "@/components/security/marks";

/**
 * 05 Custody — the register of holders, and the seal at the end of it.
 *
 * Vendor-risk work calls the subprocessor chain the invisible third party: a
 * buyer sees the vendor and has no idea who stands behind it. The useful answer
 * is the chain written out with every holder named, in order, and something
 * solid at the end so the list cannot quietly grow.
 *
 * Each holder is named the way everything on this page is named — a bar lifts
 * off it. Then the seal arrives, and it is the one block of ink on this page
 * that never lifts. That is the payoff of the whole system: four sections have
 * taught the reader that a bar here comes off, so the one that does not carries
 * the weight without a word of explanation.
 */
export function ChainStop({ holders, terminus }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;
      if (!isBelowFold(root)) return undefined;

      const parts = armMarks(root);
      const rows = gsap.utils.toArray(".cs-holder", root);
      const seal = root.querySelector(".cs-seal-fill");
      const sealBody = gsap.utils.toArray(".cs-seal-body > *", root);

      gsap.set(gsap.utils.toArray(".cs-what", root), { autoAlpha: 0, y: 8 });
      if (seal) gsap.set(seal, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(sealBody, { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({ paused: true });

      rule(tl, parts.rules, 0, { run: 0.5, stagger: 0.07 });

      rows.forEach((row, i) => {
        const at = 0.18 + i * 0.16;
        lift(tl, row.querySelector(".mk-bar"), at, { wash: row.querySelector(".mk-wash") });
        stamp(tl, [row.querySelector(".cs-n"), row.querySelector(".cs-role")], at + 0.1, {
          stagger: 0.08,
        });
        tl.to(row.querySelector(".cs-what"), {
          autoAlpha: 1,
          y: 0,
          duration: 0.34,
          ease: "power3.out",
        }, at + 0.16);
      });

      // The seal closes the register. It travels the full width and stops
      // against the far edge, and nothing about it comes off afterwards.
      const sealAt = 0.18 + rows.length * 0.16 + 0.1;
      if (seal) tl.to(seal, { scaleX: 1, duration: 0.66, ease: "power4.out" }, sealAt);
      tl.to(sealBody, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.08,
      }, sealAt + 0.34);

      settle(tl, parts);

      const stop = playOnEnter(root, tl);

      return () => {
        stop();
        disarm(root, parts);
      };
    });

    return () => media.revert();
  }, []);

  return (
    <figure className="cs" ref={scope}>
      <ol className="cs-list">
        {holders.map((holder, i) => (
          <li className="cs-holder" key={holder.name}>
            <span className="mk-rule cs-r" aria-hidden="true" />
            <Stamp className="cs-n">{String(i + 1).padStart(2, "0")}</Stamp>
            <p className="cs-name">
              <Lift wash={i === 0}>{holder.name}</Lift>
            </p>
            <p className="cs-what">{holder.what}</p>
            <Stamp className="cs-role">{i === 0 ? "Origin" : "Named holder"}</Stamp>
          </li>
        ))}
      </ol>

      {/* The one block of ink on this page that stays. */}
      <div className="cs-seal">
        <span className="cs-seal-fill" aria-hidden="true" />
        <div className="cs-seal-body">
          <Stamp className="cs-seal-k">Terminus</Stamp>
          <p className="cs-seal-name">{terminus.name}</p>
          <p className="cs-seal-what">{terminus.what}</p>
        </div>
      </div>
    </figure>
  );
}
