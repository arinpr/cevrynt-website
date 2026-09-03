"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PointerField } from "@/components/home/fx";
import { useCoarsePointer, useCounted, useHasEntered, useInView, useReady, useReducedMotion } from "@/components/progressive";

const SHOT_W = 1600;
const SHOT_H = 760;

/** How long a document holds before the stage moves itself along. */
const CYCLE_MS = 4400;

/**
 * The package as paper, standing on a lit surface.
 *
 * Three earlier versions of this section failed the same way, and it took
 * measuring the stylesheet to see it: this site uses box-shadow sixty-six
 * times, radial gradients twenty-two, blur and backdrop-filter throughout —
 * ambient light, elevation, cursor-reactive glow — and every one of my attempts
 * used none of it. Converging lines, then a proportional ribbon, then a grid of
 * flat marks. All correct, all austere, and all of them the flattest thing on
 * the page they sat in.
 *
 * So this is lit and dimensional. Each document is an actual stack of paper
 * whose height is its page count — not a bar standing for the count, the paper
 * itself, striated one line per page. Bank statements tower over the rest
 * because a hundred and twenty pages genuinely tower over one, and no chart
 * makes that land the way a physical pile does.
 *
 * Selecting a stack lifts it off the surface and lights it. The pointer moves a
 * soft key light across the whole scene through the site's own PointerField, so
 * the paper is lit by the reader rather than sitting under flat fill.
 *
 * Server-rendered fully expanded, so it all reads with no JavaScript.
 */
export function PackageStacks({ documents, total, shot }) {
  const scope = useRef(null);
  const listRef = useRef(null);
  const uid = useId();

  const ready = useReady();
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();
  const inView = useInView(scope);
  const drawn = useHasEntered(scope);

  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  const current = documents[active];
  const percent = Math.round((current.pages / total) * 100);
  const counted = useCounted(current.pages, ready && !reduced);

  useEffect(() => {
    if (!ready) return;
    ScrollTrigger.refresh();
  }, [ready]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const hold = () => setHeld(true);
    const release = () => setHeld(false);

    list.addEventListener("mouseenter", hold);
    list.addEventListener("mouseleave", release);
    list.addEventListener("focusin", hold);
    list.addEventListener("focusout", release);

    return () => {
      list.removeEventListener("mouseenter", hold);
      list.removeEventListener("mouseleave", release);
      list.removeEventListener("focusin", hold);
      list.removeEventListener("focusout", release);
    };
  }, []);

  const running = ready && inView && drawn && !held && !reduced && !coarse;

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setTimeout(() => {
      setActive((index) => (index + 1) % documents.length);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [running, active, documents.length]);

  const onKeyDown = useCallback(
    (event) => {
      const last = documents.length - 1;
      let next = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") next = active === last ? 0 : active + 1;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = active === 0 ? last : active - 1;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = last;
      if (next === null) return;

      event.preventDefault();
      setActive(next);
      listRef.current?.querySelectorAll("[role='tab']")[next]?.focus();
    },
    [active, documents.length],
  );

  return (
    <figure className={`pk${ready ? " is-ready" : ""}${drawn ? " is-drawn" : ""}`} ref={scope}>
      <PointerField selector=".pk-stage" className="pk-field">
        <div className="pk-stage">
          {/* Ambient light, then the reader's own key light over the top. */}
          <span className="pk-ambient" aria-hidden="true" />
          <span className="pk-key" aria-hidden="true" />

          <div className="pk-readout">
            <p className="hx-mono pk-readout-k">{current.range}</p>
            <p className="pk-figure">
              <span className="pk-figure-value" aria-hidden="true">{ready ? counted : current.pages}</span>
              <span className="pk-figure-unit">
                of {total} pages
                <span className="pk-figure-pc">{percent}%</span>
              </span>
            </p>
            <span className="sr-only">
              {current.name}: {current.pages} of {total} pages, {percent} per cent of the package.
            </span>
          </div>

          <ol
            className="pk-stacks"
            ref={listRef}
            role={ready ? "tablist" : undefined}
            aria-label={ready ? "Documents in the package" : undefined}
            onKeyDown={ready ? onKeyDown : undefined}
          >
            {documents.map((doc, index) => (
              <li className="pk-item" key={doc.name} role={ready ? "presentation" : undefined}>
                <button
                  type="button"
                  className={`pk-stack${index === active ? " is-live" : ""}`}
                  style={{ "--pages": doc.pages }}
                  role={ready ? "tab" : undefined}
                  id={`${uid}-tab-${index}`}
                  aria-selected={ready ? index === active : undefined}
                  aria-controls={ready ? `${uid}-panel-${index}` : undefined}
                  tabIndex={ready && index !== active ? -1 : 0}
                  onClick={() => setActive(index)}
                >
                  {/* The paper: one striation per page, and a top face so it
                      reads as a solid object rather than a bar. */}
                  <span className="pk-paper" aria-hidden="true">
                    <span className="pk-top" />
                    <span className="pk-edge" />
                  </span>
                  <span className="pk-name">{doc.name}</span>
                  <span className="hx-mono pk-count">{doc.pages}</span>
                </button>
              </li>
            ))}
          </ol>

          <span className="pk-surface" aria-hidden="true" />
        </div>
      </PointerField>

      <div className="pk-panels">
        {documents.map((doc, index) => (
          <div
            className={`pk-panel${index === active ? " is-live" : ""}`}
            key={doc.name}
            id={`${uid}-panel-${index}`}
            role={ready ? "tabpanel" : undefined}
            aria-labelledby={ready ? `${uid}-tab-${index}` : undefined}
            hidden={ready && index !== active}
          >
            <p className="hx-mono pk-panel-for">{doc.name}</p>
            <p className="pk-panel-summary">{doc.summary}</p>
            <ul className="pk-reads">
              {doc.reads.map((field, order) => (
                <li className="hx-mono pk-read" key={field} style={{ "--i": order }}>
                  {field}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pk-shot">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={SHOT_W}
          height={SHOT_H}
          sizes="(max-width: 900px) 92vw, 1340px"
          loading="lazy"
        />
      </div>
      <figcaption className="hx-mono pk-caption">{shot.caption}</figcaption>
    </figure>
  );
}
