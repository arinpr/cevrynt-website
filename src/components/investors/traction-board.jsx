"use client";

import { useRef } from "react";
import { useHasEntered, useReady } from "@/components/progressive";

/**
 * 03 — What the working MVP has actually been run against.
 *
 * Four figures on the left, the month-by-month count on the right. The bars
 * are drawn from their data in the markup (height as a custom property), so
 * the chart is complete without JavaScript; on entry they grow from the
 * baseline with a scaleY, which costs one transform each.
 *
 * The chart is a figure with a text equivalent: every bar carries its value
 * as text, and the list is readable as a list by assistive technology.
 */
export function TractionBoard({ figures, series, head, chartK, chartFoot, close, note }) {
  const scope = useRef(null);
  const ready = useReady();
  const seen = useHasEntered(scope, 0.2);
  const max = Math.max(...series.map((m) => m.n));

  return (
    <figure className={`trc${ready ? " is-ready" : ""}${seen ? " is-seen" : ""}`} ref={scope}>
      <p className="trc-head hx-mono">{head}</p>

      <div className="trc-body">
        <dl className="trc-figures">
          {figures.map((f, i) => (
            <div className="trc-figure" key={f.k} style={{ "--i": i }}>
              <dt className="trc-figure-k hx-mono">{f.k}</dt>
              <dd className="trc-figure-v">{f.v}</dd>
              {f.b ? <dd className="trc-figure-b">{f.b}</dd> : null}
            </div>
          ))}
        </dl>

        <div className="trc-chart">
          <p className="trc-chart-k hx-mono">{chartK}</p>
          <ol className="trc-bars">
            {series.map((m, i) => (
              <li className="trc-bar" key={m.k} style={{ "--i": i, "--h": m.n / max }}>
                <span className="trc-bar-v">{m.label || m.n}</span>
                <span className="trc-bar-fill" aria-hidden="true" />
                <span className="trc-bar-k hx-mono">{m.k}</span>
              </li>
            ))}
          </ol>
          <p className="trc-chart-foot">{chartFoot}</p>
        </div>
      </div>

      <p className="trc-close">{close}</p>
      <figcaption className="trc-note">{note}</figcaption>
    </figure>
  );
}
