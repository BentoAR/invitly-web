---
name: FeaturesScrollSequence — Pin + Scatter Pattern
description: Architecture and key decisions for the pinned title-shrink + floating cards scatter animation in FeaturesScrollSequence
type: project
---

The `FeaturesScrollSequence` component was reimplemented as a cinematic GSAP pin + scatter effect.

**Why:** The previous implementation was a simple alternating-columns layout with clip-path reveals. The new design matches a fintech-style reference where the section title starts as a large hero centered in the viewport, then shrinks to the top while feature cards scatter into absolute positions around it.

**Architecture decisions:**
- Two separate `<section>` elements: one `hidden lg:block` (desktop) and one `lg:hidden` (mobile) — same pattern as `HowItWorksClient.tsx`. This avoids z-index conflicts between pinned and unpinned elements.
- Desktop section has `height: 100vh; overflow: hidden` — it is the pinned element.
- `gsap.matchMedia()` isolates desktop/mobile branches; desktop gets the full pin+scatter, mobile gets simple per-card scroll reveals.
- Title shrink uses `scale` on a wrapper `<div>` (not `font-size` tween) to avoid reflow. `yPercent: -145` floats it to the top bar area.
- `scrub: 1.5` for cinematic smoothness.
- Cards start with `opacity: 0, scale: 0.84, x/y` offset; appear via `back.out(1.3)` ease for a slightly elastic pop.
- `anticipatePin: 1` on the ScrollTrigger to prevent jumpiness when pin engages.

**Scroll distance formula:**
`scrollDist = window.innerHeight * (1.5 + n * 1.0 + 1.0)` where n = number of features.

**Card position slots:** Defined in `CARD_SLOTS` array (up to 6 slots). Current data has 4 features so slots 0–3 are used (corners of the screen).

**How to apply:** If adding more features to `messages/es/home.json`, add matching slots to `CARD_SLOTS` and `CARD_ENTRY` arrays in the component. The component clips to `CARD_SLOTS.length` via `features.slice(0, CARD_SLOTS.length)`.
