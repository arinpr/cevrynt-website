"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Held,
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
 * 02 Straight answers, as the questionnaire itself.
 *
 * A risk team does not read a security page. It reads a form, and what it is
 * looking for is which lines are filled and which are not. So this is the form:
 * seven numbered rows, ruled, with a question on the left and the answer of
 * record on the right.
 *
 * The four settled answers lift out from under their bar. The three that are
 * not settled keep theirs — hollow, dashed, still covering the column — with
 * the moment each one closes stamped underneath. The reader takes in "four
 * filled, three deliberately open" from the column before reading a word, which
 * is exactly what a reviewer scanning a returned questionnaire does.
 *
 * Nothing here is hidden by CSS. Without JavaScript or with reduced motion the
 * settled answers are simply written in and the blanks simply say when they
 * close.
 */
export function AnswerRail({ items }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;
      if (!isBelowFold(root)) return undefined;

      const parts = armMarks(root);
      const rows = gsap.utils.toArray(".qf-row", root);
      const heads = gsap.utils.toArray(".qf-head .mk-stamp", root);
      const questions = gsap.utils.toArray(".qf-q", root);
      const tally = root.querySelector(".qf-tally");
      const note = root.querySelector(".qf-note");

      gsap.set(questions, { autoAlpha: 0, y: 8 });
      gsap.set([tally, note].filter(Boolean), { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({ paused: true });

      // The form is ruled and headed before anything is read off it.
      rule(tl, parts.rules, 0, { run: 0.54, stagger: 0.055 });
      stamp(tl, heads, 0.1, { stagger: 0.07 });
      tl.to(questions, { autoAlpha: 1, y: 0, duration: 0.36, ease: "power3.out", stagger: 0.07 }, 0.16);

      // Then the column of answers, row by row down the form.
      rows.forEach((row, i) => {
        const at = 0.42 + i * 0.13;
        const bar = row.querySelector(".mk-bar");
        const wash = row.querySelector(".mk-wash");
        const block = row.querySelector(".mk-held");
        const when = row.querySelector(".mk-h-when");

        if (bar) {
          lift(tl, bar, at, { wash });
          stamp(tl, row.querySelector(".qf-n"), at + 0.06);
        } else if (block) {
          // The blank does not lift. It arrives as a blank and says so.
          tl.to(block, { autoAlpha: 1, scaleX: 1, duration: 0.4, ease: "power3.out" }, at);
          stamp(tl, [row.querySelector(".qf-n"), when].filter(Boolean), at + 0.16, { stagger: 0.08 });
        }
      });

      tl.to([tally, note].filter(Boolean), {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: "power3.out",
        stagger: 0.1,
      }, 0.42 + rows.length * 0.13);

      settle(tl, parts);

      const stop = playOnEnter(root, tl);

      return () => {
        stop();
        disarm(root, parts);
      };
    });

    return () => media.revert();
  }, []);

  const settled = items.filter((item) => item.stated).length;

  return (
    <div className="qf" ref={scope}>
      <div className="qf-head">
        <Stamp className="qf-head-n">No.</Stamp>
        <Stamp>Question as your risk team asks it</Stamp>
        <Stamp>Answer of record</Stamp>
      </div>

      <ol className="qf-list">
        {items.map((item, i) => (
          <li className={`qf-row ${item.stated ? "is-set" : "is-open"}`} key={item.q}>
            <span className="mk-rule qf-r" aria-hidden="true" />
            <Stamp className="qf-n">{String(i + 1).padStart(2, "0")}</Stamp>
            <p className="qf-q">{item.q}</p>

            {item.stated ? (
              <p className="qf-a">
                <Lift wash>{item.a}</Lift>
              </p>
            ) : (
              <Held className="qf-blank" when={item.when} />
            )}
          </li>
        ))}
      </ol>

      <div className="qf-foot">
        <span className="mk-rule qf-r" aria-hidden="true" />
        <p className="qf-tally">
          <span className="qf-tally-n hx-mono">{String(settled).padStart(2, "0")}</span>
          <span className="qf-tally-t hx-mono">of {String(items.length).padStart(2, "0")} answered here</span>
        </p>
        <p className="qf-note">
          The three blanks are not evasions. Each one depends on your deployment, and each has a moment
          it closes — written above, in the column where the answer will go.
        </p>
      </div>
    </div>
  );
}
