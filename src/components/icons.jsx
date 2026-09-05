export function ChevronDown({ className = "" }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="m3 5 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const signalDots = [
  [18, 2], [18, 10], [18, 18], [18, 26], [18, 34],
  [2, 18], [10, 18], [26, 18], [34, 18],
  [10, 10], [26, 10], [10, 26], [26, 26],
];

export function SignalMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 36 36" aria-hidden="true">
      {signalDots.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.35" />)}
    </svg>
  );
}

export function ArrowRight({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CheckCircle({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m5.75 9.25 2.1 2.1 4.4-4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockOutline({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 5.25V9l2.75 1.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ShieldCheck({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.5 16 4.75v4.5c0 4.2-2.6 7.2-6 8.25-3.4-1.05-6-4.05-6-8.25v-4.5L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m7.2 10 1.9 1.9 3.7-3.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BanIcon({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4.2 13.8 9.6-9.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function LayersIcon({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3 17 7l-7 4-7-4 7-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m3 10.5 7 4 7-4M3 14l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DatabaseIcon({ className = "" }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <ellipse cx="10" cy="4.75" rx="6.25" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.75 4.75V15c0 1.38 2.8 2.5 6.25 2.5s6.25-1.12 6.25-2.5V4.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.75 9.88c0 1.37 2.8 2.5 6.25 2.5s6.25-1.13 6.25-2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
