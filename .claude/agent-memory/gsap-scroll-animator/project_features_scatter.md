---
name: FeaturesScrollSequence — Pin + Scatter + Stack Pattern
description: Architecture and key decisions for the three-phase GSAP scroll animation in FeaturesScrollSequence (title shrink, circular scatter, scroll stack)
type: project
---

The `FeaturesScrollSequence` component implements a three-phase cinematic GSAP scroll sequence.

**Why:** The design requires an Apple/GTA-style progressive reveal: hero title → scattered cards → stacked cards with scroll-driven emphasis. Each phase is scrubbed to scroll progress.

**Architecture decisions:**
- Two separate `<section>` elements: one `hidden lg:block` (desktop) and one `lg:hidden` (mobile) — avoids z-index conflicts between pinned and unpinned elements.
- Desktop section has `height: 100vh; overflow: hidden` — it is the pinned element.
- `gsap.matchMedia()` isolates desktop/mobile branches; desktop gets the full three-phase sequence, mobile uses Swiper.
- Fixed card count: `N_CARDS = 6` (hardcoded, features cycle if < 6).
- `scrub: 2.5` for cinematic smoothness.
- `anticipatePin: 1` on the ScrollTrigger to prevent jumpiness when pin engages.

**Phase 1: Title shrink** (lines 133–147)
- Title `scale: 1` → `scale: 0.5`, `yPercent: -60` to float to top
- Eyebrow fades out
- Duration: `window.innerHeight * 1`

**Phase 2: Circular scatter** (lines 149–165)
- Cards fly in from offscreen (`CARD_ENTRY` positions) to circular slots (`CARD_SLOTS`)
- Each card staggered by `cardStep = 0.4` timeline units
- Cards arrive with `opacity: 1, scale: 1, rotation: CARD_ROTATIONS[i]`
- Duration: `window.innerHeight * n * 0.3`

**Phase 3: Scroll stack** (lines 167–218) — react-bits ScrollStack style
- Each card moves from its circular position to center (`left: 50%, top: 50%, xPercent: -50, yPercent: -50`)
- Cards arrive sequentially, each taking `cardStackStep = 2.0` timeline units
- **When a card arrives, all previous cards scale down**: `scale = 1 - (cardIndex - prevIndex) * 0.03`
- Result: card 0 at scale ~0.85, card 1 at ~0.88, ..., card 5 at 1.0 (topmost)
- `zIndex: 30 + cardIndex` ensures later cards appear on top
- Indicators sync with `activeIndex` (set on each card's `onStart`)
- Duration: `window.innerHeight * n * 1.2`

**Phase 4: Final hold** (line 221)
- All cards stacked in center, last card at full scale
- Duration: `window.innerHeight * 0.8`

**Scroll distance formula:**
```js
scrollDist = phase1 + phase2 + phase3 + phase4
           = vh * (1 + n*0.3 + n*1.2 + 0.8)
```

**Card position slots:**
- `CARD_SLOTS`: 6 positions in a circular layout (top-right, top-center, top-left, bottom-left, bottom-center, bottom-right)
- `CARD_ENTRY`: offscreen starting positions for phase 2 entry animation
- `CARD_ROTATIONS`: subtle rotation per slot for depth

**How to apply:**
- If changing card count, update `N_CARDS` and adjust `CARD_SLOTS`, `CARD_ENTRY`, `CARD_ROTATIONS` arrays
- If adjusting stack scale decrement, modify `0.03` in line 206
- If adjusting timing, tweak `cardStackStep` (currently 2.0) or phase multipliers
