# SEED³X — Design-Audit (Phase 2)

**Branch:** `feature/premium-storefront-v1`  
**Stand:** 2026-10-23  
**Status:** Audit baseline; no visual implementation changes in this document.

## Scope

This audit covers visual consistency, maintainability, responsive behavior, accessibility signals, and brand presentation. It does not authorize production deployment or changes to `main`.

## Findings and priorities

### P1 — Validate navigation and age-confirmation dialog accessibly

**Files:** `src/layouts/Layout.astro`, `src/styles.css`

- A skip link and a labelled main navigation are present; preserve them.
- The age-confirmation overlay is marked as a modal dialog. Verify focus entry, focus containment, Escape behavior where appropriate, focus restoration, and keyboard access to both actions. Do not weaken or bypass the gate.
- Verify that the mobile menu exposes its expanded/collapsed state to assistive technology and remains keyboard operable.

**Acceptance:** Keyboard-only walkthrough works; visible focus is maintained; dialog semantics and focus behavior are tested; no gate bypass is introduced.

### P1 — Confirm real legal/contact content before release

**Files:** `src/layouts/Layout.astro`, `src/pages/impressum.astro`, `src/pages/datenschutz.astro`

- The footer currently labels the contact address as a placeholder.
- The legal pages are documented as drafts.

**Acceptance:** Keep placeholders clearly identified in preview; production release remains blocked until the owner supplies verified details and obtains appropriate legal review.

### P2 — Establish one design-token source of truth

**Files:** `src/styles.css`, `src/styles/botanical-motion.css`, `src/components/navbar.tsx`, `src/components/footer.tsx`

- The primary Astro layout uses the main site header/footer, while separate React navigation/footer components appear to use a different template styling approach.
- Root color tokens already exist. Extend a documented token set for spacing, type scale, borders, shadows, focus rings, and content widths before introducing new one-off values.
- Determine whether alternate template components are active routes or isolated previews before consolidating them.

**Acceptance:** A short design-token reference exists; duplicate component systems are mapped; no active route silently changes navigation or layout.

### P2 — Make CSS safer to maintain

**File:** `src/styles.css`

- The stylesheet is approximately 48 KB and densely/minimally formatted.
- Avoid a wholesale reformat or broad selector rewrite in one change. First map sections, repeated selectors, breakpoints, and overrides; then make small, visually verified changes.

**Acceptance:** CSS organization is documented; any cleanup has a narrow diff and no unexplained visual changes.

### P2 — Run a responsive and accessibility pass

**Files:** `src/layouts/Layout.astro`, `src/styles.css`, `src/styles/botanical-motion.css`

- Existing responsive breakpoints, a skip link, focus-visible styling, and reduced-motion handling are positive foundations.
- Test at 320 px, 375 px, tablet width, and desktop; check horizontal overflow, text zoom, contrast, focus visibility, heading order, image alternatives, and motion preferences.

**Acceptance:** Results are recorded by viewport and criterion; blockers are fixed before release.

### P3 — Refine brand consistency

**Files:** `src/pages/index.astro`, `src/layouts/Layout.astro`, `src/styles.css`

- The home page already has a clear botanical/editorial direction and a coherent green/cream base palette.
- Refine typography hierarchy, line length, section rhythm, image treatment, and shared button/focus styles without changing core behavior.
- The header logo source currently uses the unusual filename `/images/seedx-banner.png.PNG`; verify the actual asset path before renaming anything.

**Acceptance:** Main page and shared layout use consistent typography, spacing, button states, and navigation behavior; assets load without console/network errors.

## Recommended execution order

1. Verify CI for the latest Master Agent security change.
2. Test the age-confirmation dialog and mobile navigation with keyboard and screen-reader semantics.
3. Map the active component architecture and design tokens.
4. Apply a small, isolated design-system improvement after baseline screenshots are captured.
5. Run the build, route/asset checks, responsive review, and regression tests.

## Release guardrails

- Work only on `feature/premium-storefront-v1`.
- Do not modify `main`, publish, or deploy without explicit authorization.
- Do not claim browser QA passed until a real preview session has been checked.
- Keep product, purchase, and cultivation functionality outside this general design/accessibility audit.
