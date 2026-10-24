# SEED³X — Homepage Design Review

**Branch:** `feature/premium-storefront-v1`  
**Review date:** 2026-10-24  
**Scope:** Static source inspection of the homepage, shared layout, stylesheets, and alternate React components. No visual browser QA is claimed in this report.

## Executive summary

The homepage already has a coherent botanical/editorial direction: deep green and cream surfaces, a large serif hero headline, restrained accent colors, a custom botanical hero scene, and motion effects with reduced-motion handling. The best next step is a controlled design-system refinement rather than a wholesale redesign.

## Source observations

### 1. Typography

- `src/styles.css` declares Inter/system sans-serif as the root family.
- Hero and section headings use Georgia/Times New Roman serif stacks in several selectors.
- Product titles and tip headings also specify Georgia, so the design intentionally mixes sans-serif interface/body text and serif editorial headings.
- Font stacks and sizes are mostly embedded directly in selectors rather than expressed as a complete type-token system.

**Recommendation:** Keep the two-role typographic direction, but define explicit tokens for body/interface and display/editorial families, type sizes, line heights, weights, and measure. Before loading any external font, compare its licensing, delivery cost, and fallback behavior. Prefer a small, locally testable change.

### 2. Color and spacing tokens

The root currently defines `--green`, `--green-2`, `--lime`, `--cream`, `--ink`, `--muted`, and `--line`. Spacing, content widths, radii, shadows, and focus colors are still partly scattered as literal values.

**Recommendation:** Extend the existing token source with a modest spacing scale, content-width values, radii, shadow levels, and focus-ring tokens. Do not rename current tokens in a broad change.

### 3. CSS organization

- `src/styles.css` is approximately 50 KB and heavily compressed into long lines.
- `src/styles/botanical-motion.css` separately defines animation behavior, reduced-motion overrides, and focus-visible rules.
- The main stylesheet and motion stylesheet both influence component states such as product image hover behavior and buttons.

**Recommendation:** Map selectors, media queries, repeated declarations, and override order before reformatting or consolidating. Keep a small diff and compare the built page after each step.

### 4. Component architecture

- `src/layouts/Layout.astro` currently owns the shared site header, navigation, age-confirmation dialog, and footer.
- `src/pages/index.astro` imports `Layout.astro` and `BotanicalHeroScene.astro`.
- Separate React files `src/components/navbar.tsx` and `src/components/footer.tsx` use a different GreenGrow/template styling approach. Source inspection alone does not establish whether these components are used on a live route or only in an alternate/preview flow.

**Recommendation:** Trace imports and routes before changing or merging component systems. Preserve the current active layout unless usage is confirmed.

### 5. Responsive design and accessibility

Positive signals:
- The shared layout has a skip link and labelled navigation.
- The mobile menu updates `aria-expanded`, label text, and hidden state.
- The motion stylesheet respects `prefers-reduced-motion`.
- Focus-visible styles are explicitly defined.

Items to verify in a browser:
- Menu keyboard flow and focus after opening/closing.
- Age-dialog initial focus, focus containment, Escape policy, and focus restoration.
- Layout and text wrapping at 320 px, 375 px, tablet width, and desktop.
- Contrast of muted text and outline color against all surfaces.
- Hero scene/captions, logo image dimensions, and network/console errors.
- Text zoom and horizontal overflow.

No real browser or screen-reader walkthrough is claimed by this source-only review.

### 6. Brand assets

The home page and shared header both reference `/images/seedx-banner.png.PNG`. The unusual double extension should be treated as a naming warning, not as proof of a broken image: the asset audit previously found the file signature to be PNG. Confirm that the asset loads and visually represents the intended logo/banner before considering a rename.

## Prioritized recommendations

| Priority | Work item | Acceptance criteria |
|---|---|---|
| P1 | Browser-check age dialog and mobile menu | Keyboard-only test recorded; dialog semantics and focus behavior verified; no gate bypass |
| P1 | Verify actual logo/banner and hero assets | Assets load without network errors and visual mapping is documented |
| P2 | Establish type tokens | Body and display roles, responsive scale, line heights, and font weights documented |
| P2 | Extend design tokens | Color, spacing, widths, radii, shadows, and focus states have one documented source |
| P2 | Map active component architecture | Every route is mapped to the layout/components it actually renders |
| P2 | Responsive visual pass | 320 px, 375 px, tablet, and desktop observations recorded |
| P3 | Incremental CSS cleanup | Small diffs; no unexplained visual or behavior regressions |
| P3 | Refine hero/section rhythm | Heading widths, vertical spacing, and section transitions consistent across the home page |

## Suggested implementation sequence

1. Capture baseline screenshots at mobile and desktop sizes using a real preview/browser session.
2. Verify age-dialog and mobile-navigation accessibility behavior.
3. Map active routes/components and document current font/color/spacing usage.
4. Add only the missing design tokens, without changing the rendered design yet.
5. Migrate a small, representative set of headings and text to the tokens.
6. Compare screenshots, run existing CI, and review the diff.
7. Continue to buttons, cards, section rhythm, and responsive refinements only after the first change is verified.

## Agent status

The repository's Master Agent README describes a read-only scaffold with no model/API provider configured and no repository-write tools connected to its HTTP endpoint. Therefore, this report is a source review, not a claim that several independent autonomous agents ran. The roles for design, typography, frontend architecture, and accessibility can be assigned once actual agent execution is configured.

## Guardrails

- Work only on `feature/premium-storefront-v1`.
- Do not merge to `main`.
- Do not deploy or publish.
- Do not claim browser QA passed without a real preview session.
- Do not alter product data or purchase behavior as part of this design audit.
