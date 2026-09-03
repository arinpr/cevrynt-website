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
 * 03 Surfaces, as the retention schedule it would be in an agreement.
 *
 * Vendor-risk guidance is blunt about where these reviews fail: not on the
 * headline retention claim but on the surfaces nobody names — logging backends
 * and telemetry pipelines. A page that answers that with four feature cards has
 * already lost the argument. A schedule answers it, because a schedule has a
 * row for every surface and a column that cannot be left empty.
 *
 * So it is a schedule: ruled, headed, four rows, one clock each. The last two
 * rows carry the marker, because they are the two the caption is about.
 *
 * Built with explicit table roles on a grid rather than as a `<table>` element:
 * the row needs to be a positioned container for its own rule, which table rows
 * are not reliably allowed to be, and the roles keep the structure intact for
 * assistive technology either way.
 */
export function SurfaceCut({ surfaces }) {
  const scope = useRef(null);

  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const media = gsap.matchMedia();

    media.add({ motionOk: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
      if (!conditions.motionOk) return undefined;
      if (!isBelowFold(root)) return undefined;

      const parts = armMarks(root);
      const rows = gsap.utils.toArray(".rt-row", root);
      const heads = gsap.utils.toArray(".rt-head .mk-stamp", root);
      const bodies = gsap.utils.toArray(".rt-what", root);
      const foot = root.querySelector(".rt-foot");

      gsap.set(bodies, { autoAlpha: 0, y: 8 });
      if (foot) gsap.set(foot, { autoAlpha: 0, y: 10 });

      const tl = gsap.timeline({ paused: true });

      rule(tl, parts.rules, 0, { run: 0.58, stagger: 0.07 });
      stamp(tl, heads, 0.12, { stagger: 0.07 });

      // Each row is read down the schedule: the surface is named, its clock is
      // stamped into the column, and the description settles under it.
      rows.forEach((row, i) => {
        const at = 0.4 + i * 0.15;
        lift(tl, row.querySelector(".mk-bar"), at, { wash: row.querySelector(".mk-wash") });
        stamp(tl, [row.querySelector(".rt-n"), row.querySelector(".rt-clock")], at + 0.12, {
          stagger: 0.09,
        });
        tl.to(row.querySelector(".rt-what"), {
          autoAlpha: 1,
          y: 0,
          duration: 0.36,
          ease: "power3.out",
        }, at + 0.18);
      });

      if (foot) {
        tl.to(foot, { autoAlpha: 1, y: 0, duration: 0.42, ease: "power3.out" }, 0.4 + rows.length * 0.15);
      }

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
    <figure className="rt" ref={scope}>
      <div className="rt-table" role="table" aria-label="Retention schedule by surface">
        <div className="rt-head" role="row">
          <Stamp className="rt-h rt-h-n" as="span" role="columnheader">
            No.
          </Stamp>
          <Stamp className="rt-h" as="span" role="columnheader">
            Surface
          </Stamp>
          <Stamp className="rt-h" as="span" role="columnheader">
            What comes to rest on it
          </Stamp>
          <Stamp className="rt-h rt-h-clock" as="span" role="columnheader">
            Clock
          </Stamp>
        </div>

        {surfaces.map((surface, i) => (
          <div
            className={`rt-row ${i >= 2 ? "is-quiet" : ""}`.trim()}
            role="row"
            key={surface.name}
          >
            <span className="mk-rule rt-r" aria-hidden="true" />
            <Stamp className="rt-n" as="span" role="cell">
              {String(i + 1).padStart(2, "0")}
            </Stamp>
            <span className="rt-name" role="cell">
              <Lift wash={i >= 2}>{surface.name}</Lift>
            </span>
            <span className="rt-what" role="cell">
              {surface.what}
            </span>
            <Stamp className="rt-clock" as="span" role="cell">
              {surface.clock}
            </Stamp>
          </div>
        ))}
      </div>

      <figcaption className="rt-foot">
        <span className="mk-rule rt-r" aria-hidden="true" />
        <span className="rt-foot-t">
          Most security pages name the first of these. A vendor review finds its gaps in the last two,
          which is why they have rows here and a clock of their own.
        </span>
      </figcaption>
    </figure>
  );
}
