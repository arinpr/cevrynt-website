"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 01 — The seven things a reviewer still connects by hand.
 *
 * A ledger rather than a card grid: seven rows, each with the source on the
 * left and what the reviewer is actually checking on the right. The count is
 * the argument, so the rows arrive one after another and the total sits in
 * the head where it can be read before any of them.
 *
 * Server-rendered complete; the entrance only runs once hydrated.
 */
export function SourceLedger({ sources, head, callout, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.18);

  return (
    <figure className={`srl${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="srl-head hx-mono">{head}</p>

      <ol className="srl-list">
        {sources.map((s, i) => (
          <li className="srl-row" key={s.k} style={{ "--i": i }}>
            <span className="srl-n hx-mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="srl-k">{s.k}</span>
            <span className="srl-v">{s.v}</span>
          </li>
        ))}
      </ol>

      <p className="srl-callout">{callout}</p>
      <figcaption className="srl-note">{note}</figcaption>
    </figure>
  );
}
