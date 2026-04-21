type Props = { className?: string; opacity?: number };

export function Waves({ className, opacity = 1 }: Props) {
  return (
    <div className={className} style={{ opacity }} aria-hidden>
      <svg
        className="block w-[200%] h-full"
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
        style={{ animation: "wave-shift 18s linear infinite" }}
      >
        <path
          d="M0,100 C300,160 600,40 1200,100 C1800,160 2100,40 2400,100 L2400,200 L0,200 Z"
          fill="oklch(0.55 0.09 230 / 0.55)"
        />
      </svg>
      <svg
        className="block w-[200%] h-full -mt-10"
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
        style={{ animation: "wave-shift 28s linear infinite reverse" }}
      >
        <path
          d="M0,120 C400,60 800,180 1200,120 C1600,60 2000,180 2400,120 L2400,200 L0,200 Z"
          fill="oklch(0.35 0.09 240 / 0.7)"
        />
      </svg>
      <svg
        className="block w-[200%] h-full -mt-10"
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
        style={{ animation: "wave-shift 40s linear infinite" }}
      >
        <path
          d="M0,140 C500,80 900,200 1400,140 C1900,80 2200,200 2400,140 L2400,200 L0,200 Z"
          fill="oklch(0.22 0.07 245 / 0.95)"
        />
      </svg>
    </div>
  );
}