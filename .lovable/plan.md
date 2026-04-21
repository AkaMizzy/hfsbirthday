

# Birthday Website for Hafsa 🌷🌊

A dreamy, emotional single-experience site that feels like a love letter turned into a webpage — ocean waves, tulip fields, golden sunset light, and handwritten warmth throughout.

## Design Direction

**Palette**
- Soft teal & ocean blue (`#7FB8C4`, `#4A8FA8`)
- Warm sandy gold (`#E8C988`, `#F4D9A0`)
- Blush pink (`#F5C6CB`)
- Lavender purple (`#C9B6E4`)
- Cream/linen background (`#FBF5EC`)

**Typography**
- Headings: *Dancing Script* / *Great Vibes* (handwritten cursive)
- Body: *Cormorant Garamond* (elegant serif)
- Letter section: *Caveat* (handwritten note)

**Ambient motion**
- Gentle SVG wave animation along bottom edges
- Falling tulip petals (drifting CSS animation)
- Soft floating bokeh / sparkle particles
- Fade-up & scale-in on scroll for each section

## Page Structure (single-page scroll experience)

Built as one immersive scroll on `src/routes/index.tsx` with anchored sections — appropriate here because it's an intimate personal gift meant to be experienced top-to-bottom like a letter.

### 1. Hero
- Full-screen sunset gradient (gold → blush → lavender → teal)
- Animated SVG ocean waves at the bottom
- Silhouetted tulip field swaying
- "Happy Birthday, Hafsa 🌷" in large flowing cursive with shimmer animation
- Subtitle: "A little corner of the world, made just for you."
- Soft scroll-down indicator
- Ambient sound toggle (ocean waves) in top-right corner

### 2. Photo Gallery — "Moments with You"
- Polaroid-styled grid with slight rotation on each card
- Tape-strip detail at top of each polaroid
- Hover: lifts gently, straightens, soft glow
- Placeholder photos included; user can swap by uploading via chat
- Caption space under each polaroid

### 3. Our Memories — Scrapbook Timeline
- Vertical timeline with alternating left/right cards
- Each entry: date, small photo, handwritten-style caption
- Decorative pressed-flower & washi-tape accents
- 5–6 placeholder memory entries (easily editable)

### 4. A Letter to Her
- Aged linen-paper texture background
- Handwritten cursive font, slight ink-bleed feel
- Wax seal detail at bottom
- Warm, heartfelt placeholder letter (user can edit text)
- Fade-in line by line as it scrolls into view

### 5. The Wish Jar
- Illustrated glass jar (SVG) with floating folded notes inside
- Click jar → a note flutters out and unfolds, revealing one wish/affirmation
- 12+ rotating wishes ("May your year bloom like tulips after rain…")
- Subtle sparkle burst on each reveal

### 6. Footer
- "Made with endless love, across oceans 🌊"
- Tiny tulip + heart icon

## Interactive & Emotional Details

- **Ambient sound toggle**: gentle ocean wave loop, off by default, persists across scroll
- **Scroll-triggered animations**: each section fades & lifts in
- **Easter egg**: clicking the moon/sun in the hero corner 3 times triggers a burst of floating hearts + a tiny secret message ("She believed in you first. Always.")
- **Mobile-first**: stacked polaroids, single-column timeline, touch-friendly jar

## Tech Notes

- TanStack Start single route (`index.tsx`) — this is the right exception to multi-route rule (intimate single experience, not a content site)
- Custom CSS keyframes for waves, petals, shimmer, sparkles in `styles.css`
- Google Fonts loaded via `<link>` in root head
- All imagery via SVG illustrations + placeholder photo URLs the user can swap
- Fully responsive with Tailwind breakpoints
- Per-route head() with og:title "Happy Birthday, Hafsa 🌷" for shareability

