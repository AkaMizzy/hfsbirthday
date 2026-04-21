import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TulipGarden } from "@/components/ui/TulipGarden";
import { FinalMessage } from "@/components/ui/FinalMessage";
import birthdayMusic from "@/assets/birthday.mp3";

// Stickers — imported so Vite hashes and optimises them
import stickerShy    from "@/assets/cuteStickers/shy.png";
import stickerHeart  from "@/assets/cuteStickers/heart.png";
import stickerLaugh  from "@/assets/cuteStickers/laugh.png";
import stickerHuh    from "@/assets/cuteStickers/huh.png";
import stickerCry    from "@/assets/cuteStickers/cry.png";
import stickerSad    from "@/assets/cuteStickers/sad.png";
import stickerShhh   from "@/assets/cuteStickers/shhh.png";
import stickerIdk    from "@/assets/cuteStickers/idk.png";

// Personal photos — intentionally curated, not a dump
import imgHafsa        from "@/assets/images/hafsa.jpg";       // shy smile, red sweater → hero portrait
import imgGuitar       from "@/assets/images/hfs_with_guitar.png"; // playing guitar
import imgRedGuitar    from "@/assets/images/red_hfs.png";     // blocking cam with guitar
import imgPout         from "@/assets/images/IMG_6445.jpg";    // hair over face pout
import imgTilted       from "@/assets/images/IMG_6470.jpg";    // tilted close-up eyes
import imgGlasses1     from "@/assets/images/IMG_6634.png";   // smoldering glasses over nose
import imgGlasses2     from "@/assets/images/IMG_7286.jpg";   // cat-eye glasses, intense look
import imgGlasses3     from "@/assets/images/IMG_6463.jpg";   // dog filter + big glasses
import imgGlasses4     from "@/assets/images/hafsa1.png";     // glasses, pondering
import imgCasual       from "@/assets/images/hfs1.png";       // guitar behind her, red jacket

/* ---------- Global Audio Setup ---------- */
// Initializing outside the component forces the browser to fetch the audio the instant this script parses,
// rather than delaying the network request until after React finishes rendering.
const birthdayAudio = typeof Audio !== "undefined" ? new Audio(birthdayMusic) : null;
if (birthdayAudio) {
  birthdayAudio.loop = true;
  birthdayAudio.volume = 0.35;
  birthdayAudio.preload = "auto";
  birthdayAudio.addEventListener("ended", () => {
    birthdayAudio.currentTime = 0;
    birthdayAudio.play().catch(() => {});
  });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Hafsa 🌷" },
      { name: "description", content: "A little corner of the world, made just for you." },
      { property: "og:title", content: "Happy Birthday, Hafsa 🌷" },
      {
        property: "og:description",
        content: "A love letter turned into a webpage — ocean waves, tulip fields, and warm wishes.",
      },
    ],
  }),
  component: BirthdayPage,
});

/* ---------- Data ---------- */

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80", caption: "tulip season ✿" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", caption: "the ocean missed you" },
  { src: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80", caption: "golden hour, always" },
  { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80", caption: "wildflower hearts" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80", caption: "wishing on stars" },
  { src: "https://images.unsplash.com/photo-1455218873509-8097305ee378?w=600&q=80", caption: "where the sky cried pink" },
];

const MEMORIES = [
  { date: "the day we met", text: "I knew, somehow, that you were going to be my person. The kind of friend you don't replace." },
  { date: "first long call", text: "What was supposed to be a simple call turned into hours of talking, and neither of us noticed how fast time slipped away." },
  { date: "that one bad day", text: "The day I thought I had messed everything up and that we might stop talking, but you showed me that some things are stronger than one mistake." },
  { date: "your favorite song `Reflections` ", text: "You sent it at 2am with no context. It became my favorite too." },
  { date: "the promise", text: "One day, the same ocean. The same sand. The same sunset. I'm counting down with you." },
  { date: "today", text: "Another year of you on this earth — the world is softer for it. I'm so glad you were born, Hafsa." },
];

const WISHES = [
  "May your year bloom like tulips after rain.",
  "May the ocean always carry my love to your shore.",
  "May every sunset whisper that you are deeply, deeply seen.",
  "May joy find you in the smallest, softest places.",
  "May your heart stay tender and your courage stay loud.",
  "May the people you love love you back twice as much.",
  "May your dreams arrive gently, and on time.",
  "May you laugh until your cheeks hurt — often.",
  "May you feel held, even from oceans away.",
  "May this year be the softest one yet.",
  "May you become more of yourself, not less.",
  "May every wildflower remind you of how rare you are.",
];

/* ---------- Component ---------- */

function BirthdayPage() {
  const [easterCount, setEasterCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);
  const [wishIndex, setWishIndex] = useState<number | null>(null);
  const [wishKey, setWishKey] = useState(0);

  // Scroll reveals
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Auto-play birthday music: attempt immediately, unlock on first interaction if blocked
  useEffect(() => {
    if (!birthdayAudio) return;

    birthdayAudio.play().catch(() => {
      // Browser blocked autoplay — play on the very first touch/click/key
      const unlock = () => {
        birthdayAudio.play().catch(() => {});
        ['click', 'touchstart', 'keydown'].forEach(evt =>
          document.removeEventListener(evt, unlock, { capture: true })
        );
      };
      ['click', 'touchstart', 'keydown'].forEach(evt =>
        document.addEventListener(evt, unlock, { capture: true })
      );
    });
  }, []);

  const triggerEasterEgg = () => {
    const next = easterCount + 1;
    setEasterCount(next);
    if (next >= 3) {
      setShowSecret(true);
      const ids = Array.from({ length: 18 }, (_, i) => Date.now() + i);
      setHearts(ids);
      setTimeout(() => setHearts([]), 3200);
      setTimeout(() => setShowSecret(false), 6000);
      setEasterCount(0);
    }
  };

  const openWish = () => {
    setWishIndex(Math.floor(Math.random() * WISHES.length));
    setWishKey((k) => k + 1);
  };

  return (
    <main className="relative overflow-x-hidden">
      {/* Floating petals overlay */}
      <Petals />

      {/* Hearts easter egg */}
      {hearts.map((id, i) => (
        <span
          key={id}
          className="heart-particle"
          style={{
            left: `${5 + ((i * 53) % 90)}%`,
            animationDelay: `${(i % 6) * 0.15}s`,
            color: i % 2 ? "oklch(0.7 0.18 20)" : "oklch(0.75 0.12 320)",
          }}
        >
          ♥
        </span>
      ))}

      {showSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm pointer-events-none">
          <p className="font-[family-name:var(--font-hand)] text-3xl md:text-5xl text-linen text-center px-6 drop-shadow-lg animate-fade-up">
            "She believed in you first. Always."
          </p>
        </div>
      )}


      {/* Sun/moon easter egg */}
      <button
        onClick={triggerEasterEgg}
        aria-label="A little secret"
        className="fixed top-5 left-5 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-gold to-blush shadow-[0_0_30px_oklch(0.85_0.12_70/0.7)] hover:scale-110 transition"
      />

      <Hero />
      <PhotoGallery />
      <GuitarScene />
      <Memories />
      <Letter />
      <TulipGarden />
      <div className="relative overflow-hidden">
        <StickerAccent src={stickerHeart} size={80}  top="6%"    right="3%"  rotate={12}  floatDelay={0.8} className="hidden sm:block" />
        <StickerAccent src={stickerShy}   size={72}  bottom="8%" left="2%"   rotate={-10} floatDelay={2.0} />
        <FinalMessage />
      </div>
    </main>
  );
}

/* ---------- Sections ---------- */

function Hero() {
  return (
    <section className="relative min-h-screen sunset-bg flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <Bokeh />

      {/* hafsa.jpg — faint portrait layer, low opacity so it doesn't fight the text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${imgHafsa})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.10,
          mixBlendMode: "multiply",
        }}
      />

      {/* Sticker accents — corners only, never near text */}
      <StickerAccent src={stickerShy}   size={90}  bottom="18%" left="2%"   rotate={-12} floatDelay={0}   />
      <StickerAccent src={stickerHeart} size={70}  top="8%"     right="3%"  rotate={10}  floatDelay={1.4} className="hidden sm:block" />

      <div className="relative z-10 reveal">
        <p className="font-[family-name:var(--font-serif)] italic text-ocean-deep/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
          for my dearest Hafsa
        </p>
        <h1 className="font-serif-display text-6xl sm:text-7xl md:text-9xl leading-[1.1] shimmer-text drop-shadow-sm">
          Happy Birthday,
          <br />
          Hafsa <span className="text-5xl md:text-7xl">🌷</span>
        </h1>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-lg md:text-2xl text-ink/80 max-w-xl mx-auto italic">
          A small world I built for someone who means a lot to me.
        </p>
      </div>

      {/* Tulip silhouettes */}
      <div className="absolute bottom-24 left-0 right-0 h-40 pointer-events-none">
        <TulipField />
      </div>

      {/* Ocean waves */}
      <Waves />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-linen/90 text-sm font-[family-name:var(--font-hand)] flex flex-col items-center">
        <span> scroll ↓</span>
        <span className="text-2xl" style={{ animation: "bounce-soft 2.4s ease-in-out infinite" }}>↓</span>
      </div>
    </section>
  );
}

/* Photo Gallery — merged "The way I see you" + "Glasses era"
   5 photos: 3 on top row, 2 centered on the second row.
   All use the existing polaroid card design with captions. */
function PhotoGallery() {
  const row1 = [
    { img: imgGlasses3, alt: "Hafsa dog-filter glasses selfie",  caption: "Z3ma rani cute hh",    rotate: -2  },
    { img: imgCasual,   alt: "Hafsa in red jacket with guitar",  caption: "red era 🌹",                  rotate: 1.5 },
    { img: imgGlasses2, alt: "Hafsa cat-eye glasses intense",    caption: "mystery character",         rotate: 1.5   },
  ];
  const row2 = [
    { img: imgGlasses1, alt: "Hafsa smoldering over glasses",    caption: "the intensity model",         rotate: -2},
    { img: imgPout,     alt: "Hafsa hair-over-face pout",        caption: "Hmm",          rotate: -1  },
  ];

  return (
    <section className="relative py-28 px-6 bg-linen overflow-hidden">
      <StickerAccent src={stickerLaugh} size={88} top="4%"  right="1%" rotate={14}  floatDelay={0.6} className="hidden md:block" />
      <StickerAccent src={stickerHuh}   size={72} top="60%" left="0%" rotate={-8}  floatDelay={2.1} className="hidden md:block" />

      <SectionTitle eyebrow="a few frames of you" title="The way I see you" />

      <div className="mt-16 max-w-5xl mx-auto reveal">

        {/* Row 1 — 3 cards */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {row1.map((p, i) => (
            <div
              key={i}
              className="polaroid flex-shrink-0 w-52 md:w-64"
              style={{ transform: `rotate(${p.rotate}deg)`, transitionDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img src={p.img} alt={p.alt} loading="lazy" className="w-full h-full object-cover object-top" />
              </div>
              <p className="mt-3 text-center font-[family-name:var(--font-hand)] text-lg text-ink/80">{p.caption}</p>
            </div>
          ))}
        </div>

        {/* Row 2 — 2 cards, centered */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 md:mt-10">
          {row2.map((p, i) => (
            <div
              key={i}
              className="polaroid flex-shrink-0 w-52 md:w-64"
              style={{ transform: `rotate(${p.rotate}deg)`, transitionDelay: `${(i + 3) * 80}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img src={p.img} alt={p.alt} loading="lazy" className="w-full h-full object-cover object-top" />
              </div>
              <p className="mt-3 text-center font-[family-name:var(--font-hand)] text-lg text-ink/80">{p.caption}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* Guitar Scene — cinematic two-panel section. Tells the story of her and music. */
function GuitarScene() {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-linen via-blush/10 to-linen">
      <SectionTitle eyebrow="she plays" title="Songs for herself" />

      <div className="mt-14 max-w-5xl mx-auto reveal">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left: quiet moment playing */}
          <div className="relative">
            <div
              className="rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_oklch(0.55_0.08_225/0.35)]"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              <img
                src={imgGuitar}
                alt="Hafsa playing guitar"
                className="w-full object-cover object-top"
                style={{ maxHeight: 480 }}
              />
            </div>
            {/* Pull quote */}
            <p
              className="absolute -bottom-5 -right-4 md:-right-8 bg-gold/90 text-ink font-[family-name:var(--font-hand)] text-lg px-4 py-2 rounded shadow-md"
              style={{ transform: "rotate(2deg)" }}
            >
              in her own world ♥
            </p>
          </div>

          {/* Right: blocking the camera + copy */}
          <div className="flex flex-col gap-8">
            <div
              className="rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_oklch(0.55_0.08_225/0.3)]"
              style={{ transform: "rotate(1deg)" }}
            >
              <img
                src={imgRedGuitar}
                alt="Hafsa holding guitar, blocking camera"
                className="w-full object-cover object-top"
                style={{ maxHeight: 320 }}
              />
            </div>
            <blockquote className="font-[family-name:var(--font-hand)] text-2xl md:text-3xl text-ink/75 leading-relaxed pl-4 border-l-2 border-gold">
              There's something about the way she holds a guitar like she's been doing it her whole life. Quiet, certain, entirely her own.
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}

function Memories() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-linen via-blush/20 to-linen overflow-hidden">
      {/* Emotionally resonant edge stickers */}
      <StickerAccent src={stickerCry} size={80}  top="8%"   right="1%"  rotate={8}   floatDelay={0.3} className="hidden md:block" />
      <StickerAccent src={stickerSad} size={68}  bottom="6%" left="1%"   rotate={-10} floatDelay={1.8} className="hidden md:block" />

      <SectionTitle eyebrow="small moments" title="Things I'd never want to forget" />
      <div className="mt-20 max-w-4xl mx-auto relative">
        {/* timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ocean/40 to-transparent md:-translate-x-1/2" />
        {MEMORIES.map((m, i) => {
          const left = i % 2 === 0;
          return (
            <div
              key={i}
              className={`relative reveal mb-16 md:mb-20 flex ${left ? "md:justify-start" : "md:justify-end"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* dot */}
              <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-gold ring-4 ring-linen shadow-md" />
              <div className={`pl-16 md:pl-0 md:w-[44%] ${left ? "md:pr-8" : "md:pl-8"}`}>
                <div className="relative bg-card p-6 rounded-2xl shadow-[0_15px_40px_-20px_oklch(0.55_0.08_225/0.4)] border border-border">
                  <div className="washi-tape -top-3 left-6 -rotate-6" style={{ width: 70 }} />
                  <p className="font-[family-name:var(--font-script)] text-2xl text-ocean-deep">
                    {m.date}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-serif)] text-ink/80 leading-relaxed italic">
                    {m.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Letter() {
  const lines = [
    "My dearest Hafsa,",
    "There aren't enough words in any language for what you mean to me.",
    "You are the kindest soul I know, soft where the world is sharp, warm where it is cold.",
    "Distance has tried to be loud, but our friendship has always been louder.",
    "I hope this year is gentle with you. I hope it brings you everything you've quietly wished for. (chi 18 f bac 😉)",
    "And if it doesn't, I'll be right here, on the other end of this enormous, ridiculous ocean,",
    "loving you anyway. Always anyway.",
    "Happy birthday, my person 🌷",
    
  ];
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-linen to-ocean/10 overflow-hidden">
      {/* "Shhh, this is private" — peeking from the top-right */}
      <StickerAccent src={stickerShhh} size={82} top="3%" right="2%" rotate={12} floatDelay={1.0} className="hidden sm:block" />
      <StickerAccent src={stickerIdk}  size={64} bottom="4%" left="2%" rotate={-9} floatDelay={2.5} className="hidden md:block" />

      <SectionTitle eyebrow="A letter" title="Just For You" />
      <div className="mt-16 max-w-3xl mx-auto reveal">
        <div className="linen-paper rounded-sm p-10 md:p-16 relative" style={{ transform: "rotate(-0.4deg)" }}>
          <div className="space-y-5 font-[family-name:var(--font-hand)] text-2xl md:text-3xl text-ink/85 leading-relaxed">
            {lines.map((l, i) => (
              <p key={i} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                {l}
              </p>
            ))}
          </div>
          {/* wax seal */}
          <div className="mt-12 flex justify-end">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center font-[family-name:var(--font-display)] text-3xl text-linen shadow-lg"
              style={{
                background: "radial-gradient(circle at 30% 30%, oklch(0.65 0.18 25), oklch(0.4 0.15 22))",
                boxShadow: "0 8px 20px -5px oklch(0.4 0.15 22 / 0.6)",
              }}
            >
              H
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WishJar({
  wishIndex,
  wishKey,
  onOpen,
}: {
  wishIndex: number | null;
  wishKey: number;
  onOpen: () => void;
}) {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-ocean/10 via-lavender/20 to-linen overflow-hidden">
      <SectionTitle eyebrow="for safekeeping" title="The Wish Jar" />
      <p className="text-center mt-4 italic text-ink/70 max-w-md mx-auto">
        Tap the jar — a wish floats up, just for you.
      </p>

      <div className="mt-16 flex flex-col items-center reveal">
        <button
          onClick={onOpen}
          aria-label="Open a wish"
          className="relative group"
        >
          <JarSVG />
          <span className="absolute inset-x-0 -bottom-6 text-center text-sm font-[family-name:var(--font-hand)] text-ocean-deep/70 group-hover:text-ocean-deep transition">
            tap me ✦
          </span>
        </button>

        <div className="mt-20 h-32 flex items-center justify-center px-4">
          {wishIndex !== null && (
            <div
              key={wishKey}
              className="relative max-w-md text-center bg-card border border-gold/40 rounded-lg px-8 py-6 shadow-xl"
              style={{ animation: "note-unfold 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both" }}
            >
              <Sparkles />
              <p className="font-[family-name:var(--font-script)] text-2xl md:text-3xl text-ocean-deep leading-snug">
                {WISHES[wishIndex]}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-16 px-6 bg-ocean-deep text-linen text-center overflow-hidden">
      <div className="absolute inset-x-0 -top-1">
        <Waves inverted />
      </div>
      <p className="mt-10 font-[family-name:var(--font-script)] text-2xl md:text-3xl">
        Made with endless love, across oceans 🌊
      </p>
      <p className="mt-3 text-linen/70 text-sm">🌷 + ♥ — for Hafsa, always</p>
    </footer>
  );
}

/* ---------- Visual helpers ---------- */

/**
 * StickerAccent — places a decorative sticker at an absolute edge/corner position.
 * Always pointer-events:none so it never blocks interaction.
 * `floatDelay` offsets the animation so stickers don't all bob in sync.
 */
type StickerAccentProps = {
  src: string;
  size?: number;
  top?: string; bottom?: string; left?: string; right?: string;
  rotate?: number;
  floatDelay?: number;
  className?: string;
};
function StickerAccent({ src, size = 80, top, bottom, left, right, rotate = 0, floatDelay = 0, className = "" }: StickerAccentProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      width={size}
      height={size}
      className={`absolute pointer-events-none select-none z-10 ${className}`}
      style={{
        top, bottom, left, right,
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        animation: `sticker-float 6s ease-in-out ${floatDelay}s infinite`,
        filter: "drop-shadow(0 4px 8px oklch(0 0 0 / 0.15))",
        opacity: 0.92,
      }}
    />
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center reveal">
      <p className="uppercase tracking-[0.4em] text-xs text-ocean-deep/60 font-[family-name:var(--font-serif)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif-display text-5xl md:text-7xl text-ocean-deep">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}

function Petals() {
  const petals = Array.from({ length: 14 });
  const colors = [
    "oklch(0.87 0.06 20)",
    "oklch(0.82 0.07 305)",
    "oklch(0.83 0.11 80)",
    "oklch(0.74 0.06 215)",
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((_, i) => {
        const size = 10 + (i % 5) * 4;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 20 20"
            className="absolute"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `-10vh`,
              animation: `petal ${10 + (i % 6) * 2}s linear infinite`,
              animationDelay: `${(i * 1.3) % 12}s`,
              opacity: 0.85,
            }}
          >
            <path
              d="M10 1 C 14 5, 14 13, 10 19 C 6 13, 6 5, 10 1 Z"
              fill={colors[i % colors.length]}
            />
          </svg>
        );
      })}
    </div>
  );
}

function Bokeh() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((_, i) => {
        const size = 30 + (i % 6) * 18;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 90}%`,
              background:
                "radial-gradient(circle, oklch(1 0 0 / 0.6), oklch(1 0 0 / 0) 70%)",
              filter: "blur(2px)",
              animation: `bokeh ${8 + (i % 5) * 2}s ease-in-out infinite`,
              animationDelay: `${(i * 0.7) % 6}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function Waves({ inverted = false }: { inverted?: boolean }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={inverted ? { transform: "scaleY(-1)", top: 0, bottom: "auto" } : undefined}
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="w-[200%] h-32 md:h-40"
        style={{ animation: "wave 14s ease-in-out infinite" }}
      >
        <path
          fill="oklch(0.74 0.06 215 / 0.55)"
          d="M0,120 C240,180 480,60 720,100 C960,140 1200,180 1440,120 L1440,200 L0,200 Z"
        />
      </svg>
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="w-[200%] h-32 md:h-40 absolute inset-x-0 bottom-0"
        style={{ animation: "wave 22s ease-in-out infinite reverse" }}
      >
        <path
          fill="oklch(0.55 0.08 225 / 0.85)"
          d="M0,140 C300,80 600,200 900,140 C1200,80 1320,160 1440,140 L1440,200 L0,200 Z"
        />
      </svg>
    </div>
  );
}

function TulipField() {
  const tulips = Array.from({ length: 22 });
  return (
    <div className="relative w-full h-full">
      {tulips.map((_, i) => {
        const left = (i / tulips.length) * 100;
        const h = 60 + (i % 5) * 18;
        const colors = ["oklch(0.65 0.18 20)", "oklch(0.7 0.16 350)", "oklch(0.75 0.14 300)", "oklch(0.78 0.13 60)"];
        const c = colors[i % colors.length];
        return (
          <div
            key={i}
            className="absolute bottom-0 origin-bottom"
            style={{
              left: `${left}%`,
              height: h,
              width: 14,
              animation: `sway ${5 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.2) % 3}s`,
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-ocean-deep/70" />
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-4 rounded-t-full"
              style={{ background: c, boxShadow: `0 0 8px ${c}` }}
            />
          </div>
        );
      })}
    </div>
  );
}

function JarSVG() {
  return (
    <svg
      width="200"
      height="240"
      viewBox="0 0 200 240"
      className="drop-shadow-[0_20px_30px_oklch(0.55_0.08_225/0.4)] hover:scale-105 transition"
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.95 0.03 215)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.74 0.06 215)" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* lid */}
      <rect x="55" y="10" width="90" height="22" rx="4" fill="oklch(0.4 0.06 60)" />
      <rect x="50" y="28" width="100" height="16" rx="3" fill="oklch(0.5 0.07 60)" />
      {/* jar body */}
      <path
        d="M40 60 Q40 50 50 50 L150 50 Q160 50 160 60 L160 215 Q160 230 145 230 L55 230 Q40 230 40 215 Z"
        fill="url(#glass)"
        stroke="oklch(0.55 0.08 225 / 0.6)"
        strokeWidth="2"
      />
      {/* highlight */}
      <path d="M55 70 Q52 130 58 200" stroke="oklch(1 0 0 / 0.5)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* notes inside */}
      {[
        { x: 70, y: 180, r: -10, c: "oklch(0.9 0.08 80)" },
        { x: 110, y: 165, r: 8, c: "oklch(0.88 0.07 20)" },
        { x: 90, y: 200, r: -3, c: "oklch(0.85 0.07 305)" },
        { x: 125, y: 195, r: 14, c: "oklch(0.92 0.06 60)" },
        { x: 75, y: 145, r: 5, c: "oklch(0.87 0.08 30)" },
      ].map((n, i) => (
        <rect
          key={i}
          x={n.x}
          y={n.y}
          width="28"
          height="20"
          rx="2"
          fill={n.c}
          transform={`rotate(${n.r} ${n.x + 14} ${n.y + 10})`}
          style={{ animation: `float ${4 + i}s ease-in-out infinite`, transformOrigin: "center" }}
        />
      ))}
      {/* label */}
      <rect x="65" y="105" width="70" height="34" rx="2" fill="oklch(0.97 0.02 80)" stroke="oklch(0.7 0.05 60)" strokeWidth="0.5" />
      <text
        x="100"
        y="128"
        textAnchor="middle"
        fill="oklch(0.45 0.08 225)"
        style={{ font: "italic 16px 'Dancing Script', cursive" }}
      >
        for Hafsa
      </text>
    </svg>
  );
}

function Sparkles() {
  return (
    <>
      {[..."✦✧✦✧✦"].map((s, i) => (
        <span
          key={i}
          className="absolute text-gold"
          style={{
            left: `${10 + i * 20}%`,
            top: i % 2 ? "-12px" : "auto",
            bottom: i % 2 ? "auto" : "-12px",
            fontSize: 14 + (i % 3) * 4,
            animation: `float ${2 + i * 0.4}s ease-in-out infinite`,
          }}
        >
          {s}
        </span>
      ))}
    </>
  );
}
