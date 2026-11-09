/** The brand mark: an emerald-cut stone, drawn in outline so it takes any colour. */
export function Gem({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" className={className} aria-hidden>
      <polygon points="10,2 22,2 28,8 28,24 22,30 10,30 4,24 4,8" />
      <polygon points="12.5,8 19.5,8 22,10.5 22,21.5 19.5,24 12.5,24 10,21.5 10,10.5" />
      <path d="M10 2 12.5 8M22 2 19.5 8M28 8 22 10.5M28 24 22 21.5M22 30 19.5 24M10 30 12.5 24M4 24 10 21.5M4 8 10 10.5" />
    </svg>
  );
}

export function Wordmark({compact = false}: {compact?: boolean}) {
  return (
    <span className="flex items-center gap-3">
      <Gem className={compact ? 'size-6' : 'size-8'} />
      <span className="flex flex-col">
        <span className={`display tracking-[0.22em] ${compact ? 'text-[19px]' : 'text-[22px]'}`}>Emerald</span>
        <span className="caps mt-0.5 text-[9px] leading-none tracking-[0.34em]">Function venue</span>
      </span>
    </span>
  );
}
