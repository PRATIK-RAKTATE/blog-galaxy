# BlogGalaxy landing page

## Design tokens in `src/index.css`

- Colors: `ink-950`, `ink-900`, `ink-800`, `ink-700`, `ivory-100`, `ivory-200`, `accent-400`, `accent-500`, `info-400`
- Fonts: `font-sans`, `font-display`, `font-mono`
- Radii: `radius-card`, `radius-button`
- Shadow: `shadow-glow`
- Spacing: `spacing-section`, `spacing-gutter`, `spacing-container`

## Add a new feature card

1. Open `src/content/landing.js`.
2. Append a new object to the `features` array with `icon`, `title`, and `description`.
3. Import the Lucide icon you want to use in the same file.
4. The `Features` section will render it automatically.
