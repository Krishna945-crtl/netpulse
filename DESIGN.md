# NetPulse – Figma Design Spec

Recreate these frames in Figma, then build the React components from them.
Every colour, font size and spacing value here has the same name in `src/styles/tokens.css`,
so the design and the code stay in sync.

## 1. Set up the file (10 min)

1. New Figma design file → name it **NetPulse**.
2. Create **3 pages**: `Tokens`, `Components`, `Screens`.
3. Install the free **Inter** font (Figma has it built in).

## 2. Tokens page – Variables (15 min)

Open **Local variables** → create a collection `NetPulse` with two modes: **Light** and **Dark**.

| Variable        | Light     | Dark      |
|-----------------|-----------|-----------|
| bg              | #F4F6F9   | #0F141B   |
| surface         | #FFFFFF   | #18202A   |
| border          | #E2E6EC   | #2A3441   |
| text            | #16202C   | #E7EDF4   |
| text-muted      | #5E6B7A   | #94A3B4   |
| primary         | #0A66C2   | #4DA3FF   |
| up              | #1A8F4C   | #3ECF7A   |
| up-soft         | #E3F4EA   | #12301F   |
| degraded        | #B26B00   | #F2B14C   |
| degraded-soft   | #FDF1DC   | #3A2A10   |
| down            | #C62828   | #FF6B6B   |
| down-soft       | #FBE5E5   | #3B1616   |

**Text styles (Inter):** xs 12 · sm 14 · md 16 · lg 20 Bold · xl 28 Bold
**Spacing (8-pt grid):** 4 · 8 · 12 · 16 · 24 · 32
**Radius:** sm 8 · md 12 · pill 999

## 3. Components page (30 min)

Build each as a Figma **component with variants**:

| Component     | Variants                          | Notes |
|---------------|-----------------------------------|-------|
| StatusBadge   | status = up / degraded / down     | pill, 6px dot + label, soft bg + strong text |
| StatTile      | tone = neutral / up / degraded / down | label (xs, muted) above value (xl) |
| FilterChip    | state = default / active          | active = primary fill, white text |
| DeviceCard    | status = up / degraded / down     | 4px left border in status colour; icon box 36×36; name, site · IP; latency + sparkline |
| DeviceDrawer  | –                                 | 400px wide, details list, 320×80 sparkline, hint box |

Use **Auto layout** everywhere (padding 16, gap 12–16) so it maps 1:1 to CSS flex/grid.

## 4. Screens page (20 min)

| Frame              | Size        | Content |
|--------------------|-------------|---------|
| Dashboard – Desktop | 1280 × 900 | top bar → 5 stat tiles → filter bar → 4-column card grid |
| Dashboard – Mobile  | 390 × 844  | 2-column stats, wrapped chips, 1-column cards |
| Device drawer       | 1280 × 900 | dashboard dimmed + drawer on the right |
| Dark mode           | 1280 × 900 | duplicate desktop frame, switch variable mode to Dark |

## 5. Design → code mapping

| Figma                        | Code |
|------------------------------|------|
| Variables (Light/Dark modes) | `tokens.css` `:root` and `[data-theme="dark"]` |
| StatusBadge variants         | `StatusBadge.tsx` (`status: Status` prop) |
| DeviceCard variants          | `DeviceCard.tsx` + `.card--{status}` classes |
| Auto layout gap/padding      | CSS `gap` / `padding` using `--sp-*` tokens |
| Desktop / Mobile frames      | `@media` breakpoints at 900px and 560px |

Tip: in Figma **Dev Mode**, click any layer to see its exact spacing and colour variable, and check it against the CSS.
