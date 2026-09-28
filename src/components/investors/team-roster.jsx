"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 06 — Who is building it, and the company it sits inside.
 *
 * Headcount as three plain figures, then the company facts an investor checks
 * before anything else — entity, security posture, financing readiness — as a
 * two-column ledger. Nothing here is a claim the company cannot document:
 * SOC 2 is described as work the round funds, never as held.
 *
 * Server-rendered complete.
 */
export function TeamRoster({ people, facts, head, factsK, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.2);

  return (
    <figure className={`tmr${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="tmr-head hx-mono">{head}</p>

      <ul className="tmr-people">
        {people.map((p, i) => (
          <li className="tmr-person" key={p.k} style={{ "--i": i }}>
            <span className="tmr-person-n">{p.n}</span>
            <span className="tmr-person-k">{p.k}</span>
            <span className="tmr-person-b">{p.b}</span>
          </li>
        ))}
      </ul>

      <p className="tmr-facts-k hx-mono">{factsK}</p>
      <dl className="tmr-facts">
        {facts.map((f, i) => (
          <div className="tmr-fact" key={f.k} style={{ "--i": i }}>
            <dt className="tmr-fact-k">{f.k}</dt>
            <dd className="tmr-fact-b">{f.b}</dd>
          </div>
        ))}
      </dl>

      <p className="tmr-close">{close}</p>
      <figcaption className="tmr-note">{note}</figcaption>
    </figure>
  );
}
