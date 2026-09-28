// OpenNext adapter config for Cloudflare Workers.
// Kept as JavaScript (the project is JS/JSX only); scripts pass it with
// --openNextConfigPath because the CLI otherwise looks for open-next.config.ts.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";

// Marketing pages use ISR (revalidate = 3600). Rendered pages live in R2, with
// a per-colo regional cache in front for fast hits; the memory queue runs
// background revalidation through the WORKER_SELF_REFERENCE binding.
export default {
  ...defineCloudflareConfig({
    incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "long-lived" }),
    queue: memoryQueue,
  }),
  // `pnpm run build` is the OpenNext build itself (so Workers Builds' default
  // build command produces .open-next/). OpenNext would otherwise call
  // `pnpm build` for the Next.js step and recurse, so point it at next directly.
  buildCommand: "pnpm run build:next",
};
