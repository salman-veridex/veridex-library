# Global CSS classes and tokens

The source of truth is `projects/veridex-ui/src/lib/styles/vdx-global.css`. Import it once:

```scss
@import '@veridex/ui/styles/vdx-global.css';
```

Component styles already use these tokens. Prefer semantic tokens over raw colors and spacing values.

## Utility classes

| Group | Classes |
| --- | --- |
| Flex | `.vdx-flex`, `.vdx-flex-col`, `.vdx-flex-wrap`, `.vdx-flex-1`, `.vdx-flex-none` |
| Alignment | `.vdx-items-start`, `.vdx-items-center`, `.vdx-items-end`, `.vdx-justify-start`, `.vdx-justify-center`, `.vdx-justify-end`, `.vdx-justify-between` |
| Gap | `.vdx-gap-1`, `.vdx-gap-2`, `.vdx-gap-3`, `.vdx-gap-4`, `.vdx-gap-6`, `.vdx-gap-8` |
| Width | `.vdx-w-full`, `.vdx-w-auto`, `.vdx-min-w-0` |
| Padding | `.vdx-p-0`, `.vdx-p-4`, `.vdx-p-6`, `.vdx-p-8`, `.vdx-py-4`, `.vdx-py-6`, `.vdx-px-4`, `.vdx-px-6` |
| Margin | `.vdx-mb-2`, `.vdx-mb-4`, `.vdx-mb-6`, `.vdx-mb-8`, `.vdx-mt-4`, `.vdx-mt-6`, `.vdx-mt-auto` |
| Border/radius | `.vdx-border`, `.vdx-border-strong`, `.vdx-border-top`, `.vdx-border-bottom`, `.vdx-rounded-sm`, `.vdx-rounded-md`, `.vdx-rounded-lg`, `.vdx-rounded-xl`, `.vdx-rounded-full` |
| Background | `.vdx-bg-surface`, `.vdx-bg-canvas`, `.vdx-bg-subtle` |
| Overflow | `.vdx-overflow-hidden`, `.vdx-overflow-auto`, `.vdx-overflow-x-auto` |
| Position | `.vdx-relative`, `.vdx-absolute`, `.vdx-sticky` |
| Text | `.vdx-text-left`, `.vdx-text-center`, `.vdx-text-right`, `.vdx-font-normal`, `.vdx-font-medium`, `.vdx-font-semibold`, `.vdx-font-bold`, `.vdx-tabular-nums` |
| Display | `.vdx-block`, `.vdx-inline-block`, `.vdx-inline-flex`, `.vdx-hidden`, `.vdx-invisible` |
| Other | `.vdx-cursor-pointer`, `.vdx-cursor-default`, `.vdx-opacity-0`, `.vdx-opacity-50`, `.vdx-opacity-100` |

Example:

```html
<section class="vdx-flex vdx-items-center vdx-justify-between vdx-gap-4 vdx-p-6 vdx-bg-surface">
  <span class="vdx-font-semibold">Policy summary</span>
  <span class="vdx-tabular-nums">$12,450.00</span>
</section>
```

## Common component classes

| Area | Classes |
| --- | --- |
| Buttons | `.vdx-btn`, `.vdx-btn--primary`, `.vdx-btn--secondary`, `.vdx-btn--ghost`, `.vdx-btn--danger`, `.vdx-btn--sm`, `.vdx-btn--md`, `.vdx-btn--lg`, `.vdx-btn--loading`, `.vdx-btn--full-width` |
| Forms | `.vdx-form-field`, `.vdx-form-field__label`, `.vdx-form-field__hint`, `.vdx-form-field__error`, `.vdx-input`, `.vdx-select`, `.vdx-checkbox`, `.vdx-toggle`, `.vdx-dropzone`, `.vdx-form-grid`, `.vdx-form-actions` |
| Tables | `.vdx-table-wrapper`, `.vdx-table`, `.vdx-table--compact`, `.vdx-table--spacious`, `.vdx-table--striped`, `.vdx-table__row--selected`, `.vdx-table-toolbar`, `.vdx-paginator` |
| Navigation | `.vdx-app-shell`, `.vdx-topbar`, `.vdx-sidebar`, `.vdx-nav-item`, `.vdx-nav-item--active`, `.vdx-drawer-backdrop` |
| Feedback | `.vdx-alert`, `.vdx-alert--info`, `.vdx-alert--success`, `.vdx-alert--warning`, `.vdx-alert--error`, `.vdx-empty-state`, `.vdx-validation-summary` |
| Data/domain | `.vdx-kpi-card`, `.vdx-timeline`, `.vdx-status-chip`, `.vdx-premium-card`, `.vdx-coverage-tile`, `.vdx-audit-change`, `.vdx-chart-wrapper` |
| Documents/notifications | `.vdx-attachment`, `.vdx-doc-row`, `.vdx-notification-feed`, `.vdx-notification-item`, `.vdx-notif-count` |

Modifier and element classes follow the BEM form `vdx-block--modifier` and `vdx-block__element`.

## Semantic CSS variables

### Color
`--vdx-color-bg-canvas`, `--vdx-color-bg-surface`, `--vdx-color-bg-subtle`, `--vdx-color-bg-overlay`, `--vdx-color-border-default`, `--vdx-color-border-subtle`, `--vdx-color-border-focus`, `--vdx-color-text-primary`, `--vdx-color-text-secondary`, `--vdx-color-text-tertiary`, `--vdx-color-text-inverse`, `--vdx-color-action-primary`, `--vdx-color-action-primary-hover`, `--vdx-color-action-secondary`, `--vdx-color-action-destructive`, and status tokens under `--vdx-color-status-{success|warning|error|info|neutral}-{bg|text|border}`.

### Spacing, shape and motion
Spacing uses `--vdx-space-0` through `--vdx-space-32` plus half-step values. Shape tokens: `--vdx-radius-sm`, `--vdx-radius-md`, `--vdx-radius-lg`, `--vdx-radius-xl`, `--vdx-radius-full`. Motion tokens include `--vdx-duration-fast`, `--vdx-duration-normal`, and `--vdx-ease-default`.

### Typography and layout
Typography tokens include `--vdx-type-family-primary`, `--vdx-type-family-mono`, heading/body/label size tokens, and line-height tokens. Layout tokens include `--vdx-sidebar-width-expanded`, `--vdx-sidebar-width-collapsed`, and the responsive gutter variables.

## Responsive behavior

Most layout utilities and forms collapse at `max-width: 767px`. `vx-app-shell` changes the sidebar to a mobile drawer at that breakpoint. Keep content flexible with `.vdx-w-full`, `.vdx-min-w-0`, and `.vdx-overflow-x-auto` where needed.

## Accessibility

Use visible labels where possible, provide `ariaLabel` for icon-only controls, preserve focus styles, and do not use color alone to communicate status. The global stylesheet includes focus, reduced-motion, and semantic status patterns used by the components.
