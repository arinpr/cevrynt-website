"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The security page's one visual and motion system: the marks a reviewer makes
 * on a file.
 *
 * The previous pass gave the page a single primitive — a lit rail that travels
 * and arrests — and five geometries for it. The idea was right and the material
 * was wrong: every section was a rounded slab with a soft gradient, a drifting
 * aura and a long shadow, which is the same object drawn five times and the
 * same object every other product page draws.
 *
 * This page is not a product surface. It is a vendor security file, and it is
 * already written as one: a scope sheet, a questionnaire with four answers and
 * three declared blanks, a retention schedule, an override entry, a custody
 * chain. So the material is paper and ink, structured by rules and a margin,
 * and the motion is the set of marks somebody makes when they work through a
 * document.
 *
 * There are four gestures and nothing else on the page moves:
 *
 *   LIFT    a block of ink over a line retracts, and the line is there. Used
 *           wherever this page names something. It is the page's argument in
 *           one movement: the redaction comes off.
 *   HELD    the block does not retract. It is hollow and dashed, and the date
 *           it lifts is stamped under it. Used for the three genuine blanks.
 *   STRIKE  a rule draws across a line and the line drops back. Used for
 *           everything out of scope — crossing items off, which is what
 *           scoping a review is.
 *   STAMP   a register mark lands: a short scale and a hair of rotation that
 *           settles. Used for every clock, index and reference on the page.
 *
 * All four are transform and opacity only, so they run on the compositor.
 *
 * The rule the whole system depends on: a bar is only ever armed over text that
 * is below the fold when the effect runs. Text already on screen is left alone
 * rather than covered and uncovered in front of the reader, and text is never
 * hidden by CSS — without JavaScript, with reduced motion, or if a trigger
 * never fires, every line on this page is simply readable.
 */

/* -- Components ------------------------------------------------------------ */

/**
 * A line under a block of ink. `wash` adds the marker pass that follows the
 * bar off; keep it for the lines that carry a section, not for every one.
 */
export function Lift({ children, wash = false, className = "", as: Tag = "span", ...rest }) {
  return (
    <Tag className={`mk-l ${className}`.trim()} {...rest}>
      <span className="mk-l-t">{children}</span>
      {wash ? <span className="mk-wash" aria-hidden="true" /> : null}
      <span className="mk-bar" aria-hidden="true" />
    </Tag>
  );
}

/** A blank: the hollow block that stays, and the moment it closes. */
export function Held({ when, className = "" }) {
  return (
    <p className={`mk-h ${className}`.trim()}>
      <span className="mk-held" aria-hidden="true" />
      <span className="mk-stamp mk-h-when hx-mono">{when}</span>
    </p>
  );
}

/** A register mark. Everything monospace on this page lands as one of these. */
export function Stamp({ children, className = "", as: Tag = "span", ...rest }) {
  return (
    <Tag className={`mk-stamp hx-mono ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

/** A hairline that draws from the margin. Rules are how the page is ruled up. */
export function Rule({ className = "" }) {
  return <span className={`mk-rule ${className}`.trim()} aria-hidden="true" />;
}

/* -- Motion ---------------------------------------------------------------- */

/**
 * Sections share these helpers but not their markup — a section with no blanks
 * has no hollow block, a row with no marker has no wash — so a target that is
 * absent is normal here rather than a mistake, and every helper takes it as a
 * no-op instead of letting GSAP warn about it.
 */
const present = (target) =>
  (Array.isArray(target) ? target : [target]).filter(Boolean);

export const OUT = "power3.out";
export const ARREST = "power4.out";
export const LAND = "back.out(2.4)";

/**
 * True when `root` sits far enough below the fold that arming it cannot be
 * seen. Everything on this page is gated on it: a section the reader is
 * already looking at keeps its resting state and never animates.
 */
export function isBelowFold(root, at = 0.86) {
  return root.getBoundingClientRect().top > window.innerHeight * at;
}

/**
 * Puts every mark inside `root` into its pre-reading state and hands the parts
 * back. Selectors are read once here rather than per tween.
 */
export function armMarks(root) {
  const parts = {
    bars: gsap.utils.toArray(".mk-bar", root),
    washes: gsap.utils.toArray(".mk-wash", root),
    rules: gsap.utils.toArray(".mk-rule:not(.mk-rule-v)", root),
    rulesV: gsap.utils.toArray(".mk-rule-v", root),
    stamps: gsap.utils.toArray(".mk-stamp", root),
    holds: gsap.utils.toArray(".mk-held", root),
    strikes: gsap.utils.toArray(".mk-x", root),
  };

  // No section uses all six marks, so an empty set is normal here rather than a
  // mistake — and GSAP warns on one.
  const set = (targets, vars) => {
    if (targets.length) gsap.set(targets, vars);
  };

  // The bar covers. It retracts toward its right edge, so the line under it is
  // uncovered left to right, in reading order.
  set(parts.bars, { scaleX: 1, transformOrigin: "right center" });
  set(parts.washes, { scaleX: 0, transformOrigin: "left center", autoAlpha: 1 });
  set(parts.rules, { scaleX: 0, transformOrigin: "left center" });
  set(parts.rulesV, { scaleY: 0, transformOrigin: "top center" });
  set(parts.stamps, { autoAlpha: 0, scale: 0.86, rotate: -1.6 });
  set(parts.holds, { autoAlpha: 0, scaleX: 0.92, transformOrigin: "left center" });
  set(parts.strikes, { "--x": 0 });

  root.dataset.live = "on";
  return parts;
}

/** Undo `armMarks`. Called on cleanup so a reverted matchMedia leaves no trace. */
export function disarm(root, parts) {
  if (!parts) return;
  const all = [parts.bars, parts.washes, parts.rules, parts.rulesV, parts.stamps, parts.holds].flat();
  if (all.length) gsap.set(all, { clearProps: "all" });
  if (parts.strikes.length) gsap.set(parts.strikes, { clearProps: "--x" });
  delete root.dataset.live;
}

/**
 * LIFT. The bar peels off and, if this line has one, the marker follows it
 * across and leaves.
 *
 * The bar does not ease to a stop by running out of timeline — it decelerates
 * hard and is gone, because the point being made is that the redaction comes
 * off rather than fades.
 */
export function lift(tl, bar, at = 0, { wash = null, run = 0.52 } = {}) {
  if (!bar) return tl;
  tl.to(bar, { scaleX: 0, duration: run, ease: ARREST }, at);
  if (wash) {
    tl.to(wash, { scaleX: 1, duration: run * 0.86, ease: OUT }, at + 0.06);
    tl.to(wash, { autoAlpha: 0, duration: 0.42, ease: "none" }, at + run * 0.9);
  }
  return tl;
}

/** STRIKE. The rule draws across and the line drops back behind it. */
export function strike(tl, row, at = 0, { run = 0.42 } = {}) {
  if (!row) return tl;
  tl.to(row, { "--x": 1, duration: run, ease: OUT }, at);
  return tl;
}

/** STAMP. Lands, overshoots by a hair, settles square. */
export function stamp(tl, target, at = 0, { stagger = 0 } = {}) {
  const marks = present(target);
  if (!marks.length) return tl;
  tl.to(
    marks,
    { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.34, ease: LAND, stagger },
    at,
  );
  return tl;
}

/** A hairline ruling itself in from the margin. */
export function rule(tl, target, at = 0, { run = 0.5, stagger = 0 } = {}) {
  const rules = present(target);
  if (!rules.length) return tl;
  tl.to(rules, { scaleX: 1, duration: run, ease: OUT, stagger }, at);
  return tl;
}

/** The same, drawn down a column rather than across a row. */
export function ruleDown(tl, target, at = 0, { run = 0.62 } = {}) {
  const rules = present(target);
  if (!rules.length) return tl;
  tl.to(rules, { scaleY: 1, duration: run, ease: OUT }, at);
  return tl;
}

/**
 * Plays `tl` when `root` is reached, and guarantees it is played.
 *
 * Every section on this page hides real text behind a bar before the reader
 * gets to it, so a trigger that never fires does not degrade the page — it
 * blanks it. Three things can cause that: a trigger created after the
 * page-level refresh is never measured, a scroll proxy can leave ScrollTrigger
 * reading a stale position, and a tab that is not painting never delivers.
 *
 * So the trigger is backed by a poll on the element's own box. It is the same
 * belt-and-braces the heading reveal uses, for the same reason, and it costs a
 * bounding-box read per second until the section has been seen once.
 *
 * Returns the cleanup.
 */
export function playOnEnter(root, tl, { start = "top 76%" } = {}) {
  const st = ScrollTrigger.create({ trigger: root, start, once: true, onEnter: () => tl.play() });

  // Next task rather than next frame, because a frame callback never arrives in
  // a tab that is not painting.
  const refresh = setTimeout(() => ScrollTrigger.refresh(), 0);

  const safety = setInterval(() => {
    if (tl.progress() > 0 || tl.isActive()) return clearInterval(safety);
    const box = root.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.8 && box.bottom > 0) {
      tl.play();
      clearInterval(safety);
    }
    return undefined;
  }, 900);

  return () => {
    clearTimeout(refresh);
    clearInterval(safety);
    st.kill();
    tl.kill();
  };
}

/**
 * The safety net, and the reason arming content is safe at all.
 *
 * `armMarks` hides real text behind bars and real labels behind stamps. If a
 * timeline ever forgets one — a stamp added to the markup later, a row that
 * falls outside a loop — that content stays invisible, which is the one failure
 * this system could produce that actually matters.
 *
 * So every timeline ends with this: a `set`, not a tween, putting every mark at
 * rest. Marks the timeline already animated are already there and see no
 * change; anything missed simply appears at the end instead of never.
 */
export function settle(tl, parts, at) {
  if (!parts) return tl;
  const put = (targets, vars) => {
    if (targets && targets.length) tl.set(targets, vars, at);
  };
  put(parts.bars, { scaleX: 0 });
  put(parts.washes, { autoAlpha: 0 });
  put(parts.rules, { scaleX: 1 });
  put(parts.rulesV, { scaleY: 1 });
  put(parts.stamps, { autoAlpha: 1, scale: 1, rotate: 0 });
  put(parts.holds, { autoAlpha: 1, scaleX: 1 });
  put(parts.strikes, { "--x": 1 });
  return tl;
}

/** The blank arriving: the hollow block, then the date under it. */
export function held(tl, block, when, at = 0) {
  tl.to(block, { autoAlpha: 1, scaleX: 1, duration: 0.4, ease: OUT }, at);
  if (when) stamp(tl, when, at + 0.22);
  return tl;
}
