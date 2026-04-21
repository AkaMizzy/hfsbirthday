import { useReveal } from "@/hooks/use-reveal";
import { Waves } from "./Waves";

// Ocean gradient: deep navy → ocean blue → blush pink → foam white
// (mirrors the ocean-bloom --gradient-dawn token, inlined here since
//  dream-tide's CSS doesn't define --gradient-dawn)
const OCEAN_GRADIENT =
  "linear-gradient(180deg, oklch(0.22 0.07 245) 0%, oklch(0.55 0.09 230) 40%, oklch(0.88 0.06 10) 80%, oklch(0.97 0.012 200) 100%)";

export function FinalMessage() {
  const ref = useReveal<HTMLDivElement>(0.2);
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: OCEAN_GRADIENT }}
    >
      <div ref={ref} className="reveal relative z-10 max-w-3xl">
        {/* foam-white subheading — readable over dark navy top */}
        <p className="font-hand text-2xl md:text-3xl text-[oklch(0.97_0.012_200)] mb-6 opacity-90">
          one last thing
        </p>
        {/* near-white heading over the ocean — no more bright yellow */}
        <h2 className="font-serif-display text-5xl md:text-7xl text-[oklch(0.97_0.012_200)] leading-tight">
          Happy Birthday,{" "}
          <em className="italic text-[oklch(0.88_0.06_10)]">Hafsa</em>
        </h2>
        {/* soft foam body text */}
        <p className="font-serif-display italic mt-8 text-xl md:text-2xl text-[oklch(0.93_0.02_200)]/90 max-w-xl mx-auto">
          You are appreciated more than words can carry.
        </p>

        <a
          href="#top"
          className="mt-14 inline-block font-hand text-xl text-[oklch(0.97_0.012_200)] underline-offset-8 hover:underline transition-all"
        >
          ↑ return to the sea
        </a>
      </div>

      <Waves className="absolute bottom-0 left-0 right-0 h-[22vh] w-full" opacity={0.5} />
    </section>
  );
}