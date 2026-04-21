import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";

type TulipProps = {
  x: number;
  scale: number;
  delay: number;        // entrance + sway phase offset (seconds)
  swayDuration: number; // full sway cycle duration (seconds)
  color: string;
};

function Tulip({ x, scale, delay, swayDuration, color }: TulipProps) {
  const [active, setActive] = useState(false);
  return (
    <g
      className={`tulip-group ${active ? "active" : ""}`}
      transform={`translate(${x} 0)`}
      onClick={() => setActive((a) => !a)}
      style={{ cursor: "pointer" }}
    >
      {/* CSS custom props drive per-tulip timing in .tulip-stem animation */}
      <g
        className="tulip-stem"
        style={
          {
            "--t-delay": `${delay}s`,
            "--t-dur": `${swayDuration}s`,
          } as React.CSSProperties
        }
      >
        {/* Stem */}
        <path
          d={`M0 320 Q${-2 * scale} ${260} 0 ${200 - 60 * scale}`}
          stroke="oklch(0.5 0.12 145)"
          strokeWidth={2.5 * scale}
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaf */}
        <path
          d={`M0 ${280} Q${20 * scale} ${260} ${10 * scale} ${230}`}
          stroke="oklch(0.55 0.13 145)"
          strokeWidth={2 * scale}
          fill="oklch(0.7 0.1 145 / 0.7)"
          strokeLinecap="round"
        />
        {/* Bloom */}
        <g className="tulip-bloom" transform={`translate(0 ${200 - 60 * scale}) scale(${scale})`}>
          <path
            d="M-12 0 Q-14 -22 0 -28 Q14 -22 12 0 Q6 6 0 4 Q-6 6 -12 0 Z"
            fill={color}
          />
          <path
            d="M-8 -2 Q-4 -20 0 -26 Q4 -20 8 -2"
            fill="oklch(0.95 0.04 15 / 0.6)"
          />
        </g>
      </g>
    </g>
  );
}

const TULIP_COLORS = [
  "oklch(0.78 0.13 15)",
  "oklch(0.85 0.1 10)",
  "oklch(0.88 0.08 25)",
  "oklch(0.7 0.15 5)",
  "oklch(0.92 0.05 350)",
];

export function TulipGarden() {
  const ref = useReveal<HTMLDivElement>(0.15);

  const tulips = Array.from({ length: 22 }).map((_, i) => ({
    x: 40 + i * 55 + ((i * 17) % 20),
    scale: 0.85 + ((i * 13) % 7) / 10,
    // Clean left→right wave: each tulip enters 0.15s after its neighbour
    delay: i * 0.15,
    // Organic variation: 5.2s–6.1s cycle, avoids mechanical lock-step
    swayDuration: 5.2 + ((i * 3) % 7) * 0.13,
    color: TULIP_COLORS[i % TULIP_COLORS.length],
  }));

  return (
    <section
      className="relative overflow-hidden py-28 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.97 0.012 200) 0%, oklch(0.93 0.04 145) 100%)",
      }}
    >
      <div ref={ref} className="reveal mx-auto max-w-3xl text-center mb-12">
        <p className="font-hand text-2xl text-[oklch(0.55_0.12_15)] mb-2">
          a little garden, just for you
        </p>
        <h2 className="font-serif-display text-4xl md:text-5xl text-foreground">
          Wildflowers in bloom
        </h2>
        <p className="mt-4 text-sm tracking-widest uppercase text-muted-foreground">
          tap the tulips let it fly
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <svg
          viewBox="0 0 1300 340"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Ground strip */}
          <path
            d="M0 320 Q650 305 1300 320 L1300 340 L0 340 Z"
            fill="oklch(0.65 0.1 130 / 0.5)"
          />
          {tulips.map((t, i) => (
            <Tulip key={i} {...t} />
          ))}
        </svg>
      </div>
    </section>
  );
}