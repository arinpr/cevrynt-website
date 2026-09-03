"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { RainbowCta } from "@/components/ui/rainbow-cta";
import {
  Stamp,
  armMarks,
  disarm,
  isBelowFold,
  playOnEnter,
  rule,
  settle,
  stamp,
} from "@/components/security/marks";

/**
 * 06 Close, written as the sign-off page of the file rather than the end of a
 * pitch.
 *
 * Five sections have shown a scope sheet, a form with three declared blanks, a
 * schedule, an entry that will not lift and a chain with a seal on it. The
 * close does not restate any of it. It says what the blanks are for: a call
 * where they get filled in and written into an agreement, which is the only
 * place they honestly can be.
 *
 * Only the two quietest gestures on the page are used here — the rules and the
 * stamps. A close that shouts undoes a page whose argument is restraint.
 */
export function ReviewClose({ kicker, heading, lede, steps, calendlyUrl, email }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;
      if (!isBelowFold(root)) return undefined;

      const parts = armMarks(root);
      const stepText = gsap.utils.toArray(".sg-t", root);
      const actions = root.querySelector(".sg-actions");

      gsap.set(stepText, { autoAlpha: 0, y: 10 });
      if (actions) gsap.set(actions, { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({ paused: true });
      rule(tl, parts.rules, 0, { run: 0.62, stagger: 0.1 });
      stamp(tl, parts.stamps, 0.14, { stagger: 0.09 });
      tl.to(stepText, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.1 }, 0.2);
      if (actions) tl.to(actions, { autoAlpha: 1, y: 0, duration: 0.44, ease: "power3.out" }, 0.62);

      settle(tl, parts);

      const stop = playOnEnter(root, tl, { start: "top 82%" });

      return () => {
        stop();
        disarm(root, parts);
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div className="sg" ref={scope}>
      <div className="sg-head">
        <Stamp className="sg-k">{kicker}</Stamp>
        <h2 className="t-display-2 sg-heading" id="cta-heading">
          {heading}
        </h2>
        <p className="t-lede sg-lede">{lede}</p>
      </div>

      <ol className="sg-steps">
        {steps.map((step, i) => (
          <li className="sg-step" key={step}>
            <span className="mk-rule sg-r" aria-hidden="true" />
            <Stamp className="sg-n">{String(i + 1).padStart(2, "0")}</Stamp>
            <span className="sg-t">{step}</span>
          </li>
        ))}
        <li className="sg-close" aria-hidden="true">
          <span className="mk-rule sg-r" />
        </li>
      </ol>

      <div className="sg-actions">
        <RainbowCta href={calendlyUrl} label="Book a walkthrough" />
        <a className="sg-mail" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  );
}
