interface IconProps {
  size?: number;
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5V12H15l-.5 3H11.5v6" />
      <path d="M9.5 12H11.5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function YoutubeIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="2.5" y="6.5" width="19" height="11" rx="3.5" />
      <path d="M10.5 9.5 15 12l-4.5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
