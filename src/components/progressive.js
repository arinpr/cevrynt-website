"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED = "(prefers-reduced-motion: reduce)";
const COARSE = "(pointer: coarse)";

/** How long a figure takes to travel to a newly selected value. */
const COUNT_MS = 420;

/** Every store reads false on the server, so markup ships in its resolved state. */
const neverChanges = () => () => {};
const subscribeQuery = (query) => (notify) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", notify);
  return () => mq.removeEventListener("change", notify);
};
const subscribeReduced = subscribeQuery(REDUCED);
const subscribeCoarse = subscribeQuery(COARSE);

/**
 * True only once the client has hydrated.
 *
 * Interactive sections render every panel open on the server, so the whole
 * section reads without JavaScript and search engines see all of it. This flag
 * is what collapses that resolved markup into the interactive arrangement.
 */
export function useReady() {
  return useSyncExternalStore(neverChanges, () => true, () => false);
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
}

export function useCoarsePointer() {
  return useSyncExternalStore(subscribeCoarse, () => window.matchMedia(COARSE).matches, () => false);
}

/** Live visibility, so nothing ticks while its section is off-screen. */
export function useInView(ref, threshold = 0.25) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // No observer means no gate rather than no motion. Deferred rather than set
    // straight from the effect body, which would cascade a second render.
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }

    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(node);
    return () => io.disconnect();
  }, [ref, threshold]);

  return inView;
}

/**
 * Latches true the first time an element is reached, and stays true.
 *
 * Separate from `useInView` because entrances should play once while timers
 * still need to know whether the section is on screen right now.
 */
export function useHasEntered(ref, threshold = 0.25) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setEntered(true), 0);
      return () => window.clearTimeout(id);
    }

    // Two independent paths to the same latch. An entrance that hides its
    // element must not depend on a single API: an observer only reports on a
    // page that is being painted, so a passive geometry check on scroll backs
    // it up. Whichever arrives first wins, and both are torn down together.
    let done = false;
    const latch = () => {
      if (done) return;
      done = true;
      setEntered(true);
      release();
    };

    const check = () => {
      const box = node.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) latch();
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) latch();
    }, { threshold });

    function release() {
      io.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearTimeout(id);
    }

    io.observe(node);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    const id = window.setTimeout(check, 120);

    return release;
  }, [ref, threshold]);

  return entered;
}

/**
 * A figure that travels to its target whenever the target changes.
 *
 * Discrete selections rather than a scrub, so a short interpolation is lighter
 * than pulling a tween library in for one number. When it is switched off the
 * target is returned untouched, which is what reduced motion should see.
 */
export function useCounted(target, enabled) {
  const [shown, setShown] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (!enabled) return undefined;

    const from = fromRef.current;
    if (from === target) return undefined;

    let frame = 0;
    let start = 0;

    const step = (now) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / COUNT_MS);
      // easeOutCubic, so the figure settles rather than stopping dead.
      const value = Math.round(from + (target - from) * (1 - (1 - p) ** 3));
      fromRef.current = value;
      setShown(value);
      if (p < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);

    // Throttled or unpainted tabs never run a frame, which would leave the old
    // figure standing beside the new document a share. This settles it either way.
    const settle = window.setTimeout(() => {
      fromRef.current = target;
      setShown(target);
    }, COUNT_MS + 90);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [target, enabled]);

  return enabled ? shown : target;
}
