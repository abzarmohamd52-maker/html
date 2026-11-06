# RadModern Design System

All site-wide visual foundations and reusable UI primitives live in **`design-system.css`**. Every HTML page loads it after its page stylesheets so shared tokens and components remain authoritative.

## Single source of truth

- Brand colors, neutral colors, decorative palette, and translucent overlays: `:root` in `design-system.css`.
- Font families and type scale: `--rm-font`, `--rm-font-display`, `--rm-font-persian-display`, and `--rm-text-*`.
- Spacing: `--rm-space-*` (4px base scale).
- Radius and elevation: `--rm-radius-*` and `--rm-shadow-*`.
- Legacy variables such as `--blue`, `--accent`, and `--muted` are aliases. Do not assign new literal colors to them.

## Shared components

### Buttons

Use the same base class for every button or button-like link:

- `btn` or `btn btn-primary`: primary action.
- `btn btn-ghost`: outlined secondary action.
- `btn btn-white` or `btn btn--white`: white action on a dark surface.

The shared anatomy, typography, height, padding, radius, focus state, disabled state, and hover behavior are defined once in `design-system.css`. Page CSS may control placement or width, but must not redefine the button's visual foundation.

### Cards and panels

Existing semantic classes (`card`, `work`, `info-card`, `form-card`, `value`, `member`, and `tech`) share the same border, radius, shadow, and surface tokens. Page CSS owns only their content layout and responsive arrangement.

## Rules for future edits

1. Change a brand color or font in `design-system.css`, not in a page stylesheet.
2. Reuse `btn` and its variants. Do not create a second button style for the same role.
3. Reuse the existing card classes and shared surface tokens. Add a new component only when its behavior or content structure is genuinely different.
4. Page stylesheets (`site.css` and `home.css`) may define page layout, unique illustration details, and responsive composition; they should not introduce new global colors, fonts, button anatomy, or card foundations.
5. Keep the shared stylesheet last in each page's stylesheet order.
