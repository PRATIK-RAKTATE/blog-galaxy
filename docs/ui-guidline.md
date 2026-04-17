only use instruction when you are doing change with ui
# CareerAI — UI Style Guide (paste into any page-build prompt)

Build this page in the **exact visual language** of the existing CareerAI app. Match the system below. Do NOT improvise a new aesthetic.

## 1. Foundation
- **Background:** deep near-black navy (`#0A0B14` → `#11131F`) with a very subtle radial/vignette glow from top-center. Body is flat dark, not pure black.
- **Container:** centered, max-width ~1180px, generous vertical rhythm between sections (~48–64px).
- **Corners:** consistently rounded. Cards `rounded-2xl` (20–24px), pills fully rounded, buttons `rounded-xl`.
- **Borders:** 1px, very low-opacity white (`rgba(255,255,255,0.06–0.10)`). Never harsh.
- **Surfaces:** glassmorphism — card background is a dark translucent gradient (`from-white/[0.03] to-white/[0.01]`) with a faint inner highlight on the top edge.

## 2. Per-Section Accent Color
Each top-level route has ONE accent hue that drives its heading gradient, active tab underline, primary CTA, and status dots. Rest of the UI stays neutral.
- Resume Builder → **amber/gold** (`#F5B544`)
- Feedback → **electric blue** (`#3B6CF6` → `#6C8CFF`)
- Aptitude → **violet/purple** (`#8B6CFF` → `#C69BFF`)
- New pages: pick ONE accent and apply it the same way. Never mix two accents on one page.

## 3. Typography
- **Body / UI / nav:** clean geometric sans (Inter or similar), normal tracking.
- **Display headings (H1 of each section):** heavy **slab-serif / display** face (think Recoleta Black, Caslon Doric Display, or similar chunky slab). This is the signature — do not substitute a plain sans.
- **Section H1 pattern:** two-tone — first word(s) in white, emphasis word in the section's accent color (optionally with a subtle gradient).
- **Subtitle:** regular sans, `text-white/60`, ~16–17px, 1.55 line-height.
- **Micro-labels:** ALL CAPS, tracked `+0.1em`, ~11–12px, `text-white/50` (e.g. `CURRENT VIEW`, `LIBRARY`, `QUESTIONS`).

## 4. Navigation Bar (consistent on every page)
- Floating pill-shaped bar, dark glass fill, thin light border, sits on the dark bg with visible rounded ends.
- Left: compact logo lockup — product name in white + tagline underneath in accent blue, tiny caps.
- Center: nav items in uppercase tracked text. Active item gets a **soft glass pill background + accent-colored underline**.
- Right: a secondary text link + an outlined pill button (Logout-style).

## 5. Components
### Badge / Status Pill
Fully rounded, dark glass fill, thin border, tiny colored dot + uppercase tracked label (e.g. `• AI POWERED`, `• RESUME WORKSPACE`). Use to tag the section above the H1.

### Card
Dark glass panel, `rounded-2xl`, ~24–32px padding, faint border. Optional: thin gradient line along the **top edge** of the card in the card's accent color (seen on the Easy/Medium/Hard cards).

### Stat / Info Block
Inside a card, clusters of `NUMBER` (bold, large) on top with a micro-label (caps, muted) beneath. Place 2–4 in a row separated by subtle vertical dividers.

### List Row with Icon
Small square icon tile (`rounded-xl`, accent-tinted glass bg, accent-colored icon) + bold title + muted one-line subtitle. Stack vertically with ~8–12px gap.

### Buttons
- **Primary CTA:** solid accent gradient fill, white text, medium weight, leading icon, `rounded-xl`, soft outer glow in the accent color. Used once per view.
- **Secondary:** outlined pill, `border-white/15`, white text, transparent fill, hover brightens border.
- **Tertiary / tag pills:** tiny rounded-full chips, `bg-white/5`, `text-white/70`.

### Note / Callout
Inline block with a **left accent bar** (2px, amber for warnings, blue for info), faint tinted bg, small muted body text, bold `Note:` label.

## 6. Page Skeleton (use this order every time)
1. Floating nav bar
2. Thin section header strip: small avatar/icon + section title + one-line description (optional, for sub-pages)
3. **Hero card**: badge → bold display H1 (two-tone) → subtitle → right-side info chips (like `CURRENT VIEW / STATE`) OR right-side secondary button
4. Content region: one or more cards in a 1, 2, or 3-column grid depending on density
5. Primary action (CTA button) is always inside its own card context, not floating

## 7. Motion & Feedback
- Hover on cards: border lifts to `white/15`, subtle `translateY(-2px)`, soft accent glow.
- Buttons: scale 0.98 on press, accent glow intensifies on hover.
- Loading states: simple centered "Loading…" in muted text inside the target card — don't skeleton-shimmer everywhere.

## 8. Hard Rules (don't break)
- Never use pure black or pure white — always off-shades with warmth/coolness.
- Never mix two section accents on one page.
- Display headings always use the slab/display font, never the body sans.
- Keep the page to **one** primary gradient CTA.
- Don't add drop shadows on text. Shadows only as soft glows on accent elements.

---
**My request:** [describe the new page/feature here]
**Section accent to use:** [pick one]