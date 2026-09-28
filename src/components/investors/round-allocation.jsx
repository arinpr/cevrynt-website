"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 08 — The round, and where every dollar of it goes.
 *
 * The amount on the left at display size; the allocation on the right as
 * horizontal bars scaled to their share. Each bar's width is data in the
 * markup, so the split is exact without JavaScript, and on entry the bars
 * grow from the left edge with a scaleX.
 */
export function RoundAllocation({ round, allocation, head, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.2);

  return (
    <figure className={`rnd${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="rnd-head hx-mono">{head}</p>

      <div className="rnd-body">
        <div className="rnd-round">
          <p className="rnd-stage hx-mono">{round.stage}</p>
          <p className="rnd-amount">{round.amount}</p>
          <p className="rnd-purpose">{round.purpose}</p>
          <dl className="rnd-terms">
            {round.terms.map((t) => (
              <div className="rnd-term" key={t.k}>
                <dt className="hx-mono">{t.k}</dt>
                <dd>{t.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol className="rnd-split">
          {allocation.map((a, i) => (
            <li className="rnd-line" key={a.k} style={{ "--i": i, "--w": a.pct / 100 }}>
              <span className="rnd-pct">{a.pct}%</span>
              <span className="rnd-k">{a.k}</span>
              <span className="rnd-track" aria-hidden="true">
                <span className="rnd-fill" />
              </span>
              <span className="rnd-b">{a.b}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="rnd-close">{close}</p>
      <figcaption className="rnd-note">{note}</figcaption>
    </figure>
  );
}
