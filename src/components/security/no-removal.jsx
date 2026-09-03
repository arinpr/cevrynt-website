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

const MIN_DRAG = 8;

/**
 * 04 Accountability — the entry, and the redaction tool handed to the reader.
 *
 * Every other section on this page uses the lift to make a point on the
 * reader's behalf: a bar comes off and a line is named. This one gives the bar
 * to the reader instead.
 *
 * Drag across the original reading and a block of ink follows the pointer
 * exactly as a marker would. Let go and it lifts straight back off, because the
 * original is still there and there is no mechanism in this system for removing
 * it. Two of the three figures in the register below can never move; the middle
 * one climbs every time the reader tries, which is the only honest way to
 * demonstrate the claim rather than assert it.
 *
 * Fine pointers only. On a touch screen a drag across a section is a scroll,
 * and stealing it to make a point would cost more than the point is worth — so
 * there the register simply reads what it reads.
 */
export function NoRemoval({ record }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add(
      {
        motionOk: "(prefers-reduced-motion: no-preference)",
        canDraw: "(hover: hover) and (pointer: fine)",
      },
      ({ conditions }) => {
        if (!conditions.motionOk) return undefined;

        const cleanups = [];

        /* -- The entrance ---------------------------------------------------- */
        if (isBelowFold(root)) {
          const parts = armMarks(root);
          const field = root.querySelector(".nr-field");
          const keys = gsap.utils.toArray(".nr-k, .nr-by", root);
          const figures = gsap.utils.toArray(".nr-fig", root);
          const reason = root.querySelector(".nr-reason");

          // The three figures are stamped like everything else, but they are
          // not `.mk-stamp` — they are the register's numbers, so they carry
          // their own resting styles and get armed here.
          gsap.set(figures, { autoAlpha: 0, scale: 0.88, rotate: -1.6 });
          gsap.set([reason].filter(Boolean), { autoAlpha: 0, y: 10 });

          const tl = gsap.timeline({ paused: true });
          stamp(tl, field, 0);
          rule(tl, parts.rules, 0.08, { run: 0.56, stagger: 0.08 });
          stamp(tl, keys, 0.16, { stagger: 0.08 });

          // The current reading is named the way the rest of the page names
          // things. The prior entry is not covered at all — it has never been
          // covered, which is the whole point of it.
          lift(tl, root.querySelector(".nr-now .mk-bar"), 0.3, {
            wash: root.querySelector(".nr-now .mk-wash"),
          });
          stamp(tl, figures, 0.62, { stagger: 0.12 });
          if (reason) tl.to(reason, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out" }, 0.78);
          // Anything left over — the invitation to drag, the illustrative note —
          // lands last, so nothing armed by `armMarks` is left at zero.
          stamp(tl, gsap.utils.toArray(".nr-hint, .nr-note", root), 0.9, { stagger: 0.1 });

          settle(tl, parts);

          const stop = playOnEnter(root, tl);
          cleanups.push(() => {
            stop();
            disarm(root, parts);
          });
        }

        /* -- The reader's redaction ------------------------------------------ */
        if (conditions.canDraw) {
          const target = root.querySelector(".nr-target");
          const ink = root.querySelector(".nr-ink");
          const tries = root.querySelector(".nr-tries");
          const hint = root.querySelector(".nr-hint");

          if (target && ink) {
            root.dataset.draw = "on";
            gsap.set(ink, { scaleX: 0, x: 0, transformOrigin: "left center", autoAlpha: 1 });

            let from = 0;
            let width = 1;
            let drawing = false;
            let count = 0;

            // Pointer capture keeps the stroke tracking when the pointer leaves
            // the entry, but it throws on a pointer the element does not own,
            // and an exception here would take the retract down with it.
            const capture = (id, on) => {
              try {
                if (on) target.setPointerCapture?.(id);
                else target.releasePointerCapture?.(id);
              } catch {
                /* Nothing to capture or release. The stroke works regardless. */
              }
            };

            const place = (clientX) => {
              const box = target.getBoundingClientRect();
              const to = gsap.utils.clamp(0, box.width, clientX - box.left);
              const left = Math.min(from, to);
              // Transform only: the bar is the full width of the entry and is
              // translated and scaled into place rather than laid out.
              gsap.set(ink, { x: left, scaleX: Math.abs(to - from) / width });
              return Math.abs(to - from);
            };

            const start = (event) => {
              const box = target.getBoundingClientRect();
              width = box.width || 1;
              from = gsap.utils.clamp(0, box.width, event.clientX - box.left);
              drawing = true;
              // Off for the stroke: the bar has to sit under the pointer
              // exactly, with no easing between it and the hand.
              ink.classList.remove("is-lifting");
              gsap.set(ink, { x: from, scaleX: 0 });
              capture(event.pointerId, true);
              if (hint) gsap.to(hint, { autoAlpha: 0, duration: 0.24, ease: "none" });
            };

            const move = (event) => {
              if (!drawing) return;
              place(event.clientX);
            };

            const release = (event) => {
              if (!drawing) return;
              drawing = false;
              const drawn = place(event.clientX);

              // And it comes straight back off.
              //
              // A CSS transition rather than a tween, deliberately. This is the
              // one beat on the page that must not fail: a bar left sitting on
              // the original would say the exact opposite of what this section
              // is for. A transition is a single style write handed to the
              // compositor, so it survives a stalled ticker, a throttled
              // background tab and a frame callback that never arrives — none
              // of which a JavaScript-driven tween survives.
              ink.classList.add("is-lifting");
              gsap.set(ink, { scaleX: 0 });
              capture(event.pointerId, false);

              if (drawn < MIN_DRAG) return;
              count += 1;
              if (tries) {
                tries.textContent = String(Math.min(count, 99)).padStart(2, "0");
                gsap.fromTo(
                  tries,
                  { scale: 0.88, rotate: -2 },
                  { scale: 1, rotate: 0, duration: 0.32, ease: "back.out(2.6)" },
                );
              }
            };

            target.addEventListener("pointerdown", start);
            target.addEventListener("pointermove", move);
            target.addEventListener("pointerup", release);
            target.addEventListener("pointercancel", release);

            cleanups.push(() => {
              target.removeEventListener("pointerdown", start);
              target.removeEventListener("pointermove", move);
              target.removeEventListener("pointerup", release);
              target.removeEventListener("pointercancel", release);
              gsap.killTweensOf(ink);
              delete root.dataset.draw;
            });
          }
        }

        return () => {
          for (const fn of cleanups) fn();
        };
      },
    );

    return () => media.revert();
  }, []);

  return (
    <figure className="nr" ref={scope}>
      <Stamp className="nr-field">{record.field}</Stamp>

      <div className="nr-entry nr-now">
        <Stamp className="nr-k">Current reading</Stamp>
        <p className="nr-v">
          <Lift wash>{record.now}</Lift>
        </p>
        <Stamp className="nr-by">
          {record.by} · {record.at}
        </Stamp>
      </div>

      <div className="nr-entry nr-was">
        <Stamp className="nr-k">Prior entry · retained in full</Stamp>
        {/* The thing the reader gets to try to remove. */}
        <div className="nr-target">
          <p className="nr-v nr-v-was">{record.was}</p>
          <span className="nr-ink" aria-hidden="true" />
        </div>
        <Stamp className="nr-hint">Drag across it</Stamp>
      </div>

      <div className="nr-ledger">
        <span className="mk-rule nr-r" aria-hidden="true" />
        <div className="nr-count">
          <Stamp className="nr-k">Entries removed</Stamp>
          <span className="nr-fig hx-mono">00</span>
        </div>
        <div className="nr-count">
          <Stamp className="nr-k">Redactions attempted</Stamp>
          <span className="nr-fig nr-tries hx-mono">00</span>
        </div>
        <div className="nr-count">
          <Stamp className="nr-k">Redactions that held</Stamp>
          <span className="nr-fig hx-mono">00</span>
        </div>
      </div>

      <figcaption className="nr-foot">
        <span className="mk-rule nr-r" aria-hidden="true" />
        <span className="nr-reason">
          <Stamp className="nr-k">Reason given</Stamp>
          <span className="nr-reason-v">{record.reason}</span>
        </span>
        <Stamp className="nr-note">Illustrative record · synthetic borrower data</Stamp>
      </figcaption>
    </figure>
  );
}
