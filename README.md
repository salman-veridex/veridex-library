# `@veridex/ui` — VeriDex Enterprise UI Component Library

[![Angular Version](https://img.shields.io/badge/Angular-21%2B-dd0031.svg?style=flat-square&logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.2%20AA-008000.svg?style=flat-square)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

A production-ready, enterprise-grade Angular 21+ shared UI component library reproducing the **VeriDex** design system. Built with standalone components, Angular Signals, Angular CDK primitives, and WCAG 2.2 AA accessibility compliance.

---

## 🚀 Key Features

- ⚡ **Angular 21+ Native**: 100% Standalone components, directives, and services with zero NgModules required.
- 🚥 **Angular Signals State**: Ultra-performant reactive state using `signal`, `computed`, `input`, and `output`.
- 🎨 **VeriDex Visual Identity**: 100% fidelity to the VeriDex CSS design tokens (`vdx-global.css`) — VeriDex Orange (`#f86407`), Navy (`#1b2635`), Inter, and JetBrains Mono fonts.
- ♿ **WCAG 2.2 AA Accessibility**: Full keyboard navigation (`Tab`, `Space`, `Enter`, `Escape`), focus ring standard, screen-reader friendly ARIA markup, and CDK FocusTrap.
- 📦 **Tree-Shakable APF Packaging**: Built via `ng-packagr` with clean barrel exports (`public-api.ts`).
- 🛡️ **30 Complete Component Categories**: From buttons and data grids to complex insurance domain primitives like policy status chips, bordereaux grids, FNOL claims, and KPI cards.

---

## 📦 Installation

Install `@veridex/ui` and `@angular/cdk` in your Angular project:

```bash
npm install @veridex/ui @angular/cdk
```

*(Note: If installing locally from tarball: `npm install ./dist/veridex-ui/veridex-ui-0.0.1.tgz @angular/cdk@21`)*

---

## 🎨 Global Styles Import

Import the VeriDex design tokens and global stylesheet in your project's `src/styles.scss` (or `angular.json` styles array):

```scss
/* src/styles.scss */
@import '@veridex/ui/styles/vdx-global.css';

html, body {
  height: 100%;
  margin: 0;
  font-family: var(--vdx-type-family-primary);
  background-color: var(--vdx-color-bg-canvas);
  color: var(--vdx-color-text-primary);
}
```

---

## 💻 Quick Start Usage

Import any component directly into your standalone Angular component's `imports` array:

```typescript
import { Component } from '@angular/core';
import { 
  VxAppShellComponent, 
  VxTopBarComponent, 
  VxButtonComponent, 
  VxCardComponent,
  VxPolicyStatusChipComponent,
  VxToastContainerComponent,
  VxToastService 
} from '@veridex/ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    VxAppShellComponent,
    VxTopBarComponent,
    VxButtonComponent,
    VxCardComponent,
    VxPolicyStatusChipComponent,
    VxToastContainerComponent
  ],
  template: `
    <vx-app-shell>
      <vx-top-bar portalName="Policy Management Portal"></vx-top-bar>
      <vx-toast-container></vx-toast-container>
      
      <div style="padding: 24px;">
        <vx-card variant="default">
          <h2>Policy Details: POL-2026-001</h2>
          <p>Status: <vx-policy-status-chip status="active"></vx-policy-status-chip></p>
          
          <vx-button variant="primary" leadingIcon="vdx-policy" (clicked)="onSave()">
            Issue Policy Schedule
          </vx-button>
        </vx-card>
      </div>
    </vx-app-shell>
  `
})
export class AppComponent {
  constructor(private toast: VxToastService) {}

  onSave() {
    this.toast.success('Policy bound successfully!');
  }
}
```

---

## 📋 Component Inventory (30 Categories)

| Category | Selectors / API | Key Features |
|---|---|---|
| **App Shell & Layout** | `<vx-app-shell>`, `<vx-top-bar>`, `<vx-sidebar>`, `<vx-sidebar-item>`, `<vx-stack>`, `<vx-inline>`, `<vx-grid>` | Topbar, collapsible 240px→56px sidebar, mobile drawer, skip link. |
| **Buttons** | `<vx-button>`, `<vx-button-group>`, `<vx-icon-button>` | Primary, secondary, outline, ghost, destructive, loading, sizes sm/md/lg. |
| **Badges & Chips** | `<vx-badge>`, `<vx-chip>`, `<vx-chip-group>` | Neutral, success, warning, error, info badges + selectable/removable chips. |
| **Avatar** | `<vx-avatar>`, `<vx-avatar-group>` | Sizes xs to xl, image error fallback to initials, status indicators. |
| **Cards** | `<vx-card>`, `<vx-card-header>`, `<vx-card-title>`, `<vx-card-content>`, `<vx-card-footer>` | Default, raised, selected, compact, comfortable, flat, clickable. |
| **Typography** | `<vx-heading>`, `<vx-text>`, `<vx-label>`, `<vx-code>` | H1–H6, body sizes, semantic colors, code blocks. |
| **Tabs** | `<vx-tabs>`, `<vx-tab>` | Accessible tab navigation, active indicator, disabled state. |
| **Accordion** | `<vx-accordion>`, `<vx-accordion-item>` | Expandable panels with animated chevron. |
| **Stepper** | `<vx-stepper>` | Workflow steps: upcoming, active, completed, error. |
| **Forms & Controls** | `<vx-form-field>`, `<vx-input>`, `<vx-select>`, `<vx-checkbox>`, `<vx-toggle>`, `<vx-file-upload>`, `<vx-currency-input>`, `<vx-validation-summary>` | ControlValueAccessor compliant, drag & drop upload, formatted currency `$12,500.50`. |
| **Table / Data Grid** | `<vx-table>`, `<vx-paginator>` | Sorting, pagination, row selection, density modes (`compact`, `comfortable`, `spacious`). |
| **Alerts & Banners** | `<vx-alert>`, `<vx-alert-banner>` | Contextual inline alerts and maintenance banners. |
| **Toast Notifications** | `<vx-toast-container>`, `VxToastService` | Bottom-right toast container, auto-dismiss, service methods (`success`, `error`, `warning`, `info`). |
| **Modal / Dialog** | `<vx-modal>` | Accessible dialog overlay, focus handling, Escape key dismiss. |
| **Drawer / Side Panel** | `<vx-drawer>` | Side panel overlay with backdrop. |
| **Tooltip & Popover** | `[vxTooltip]`, `[vxPopover]` | Hover and click overlays. |
| **Empty State** | `<vx-empty-state>` | Centered icon, title, description, call-to-actions. |
| **Loading States** | `<vx-spinner>`, `<vx-skeleton>`, `<vx-progress-bar>` | Loading spinners (sm/md/lg), shimmer skeletons, progress bars. |
| **Timeline** | `<vx-timeline>` | Activity feed with timeline dots and variant colors. |
| **Breadcrumbs** | `<vx-breadcrumb>` | Trail navigation with accessible separators. |
| **Kanban Board** | `<vx-kanban-board>` | Submission columns with task cards and tags. |
| **Mini Calendar** | `<vx-calendar>` | Datepicker calendar grid with month navigation. |
| **Invoice / Premium Card** | `<vx-premium-card>` | Policy premium invoice summary card. |
| **Notification Feed** | `<vx-notification-feed>` | In-app feed items with unread state indicators. |
| **Audit Log** | `<vx-audit-log>` | Before & after field change change log viewer. |
| **KPI Cards** | `<vx-kpi-card>` | Metric card with trend indicators (up/down/neutral). |
| **Policy Status Chip** | `<vx-policy-status-chip>` | Policy status mapping (`draft`, `quoted`, `bound`, `active`, `renewal`, `cancelled`, `expired`, `lapsed`). |
| **Login UI** | `<vx-login-card>` | Auth login card primitive. |
| **User Management** | `<vx-avatar-group>`, `<vx-table>` integration | User directory UI primitives. |
| **Role & Permissions** | `<vx-permission-matrix>` | Role vs permission matrix checkbox table. |

---

## 🛠️ Monorepo Commands

```bash
# Build the @veridex/ui library
npx ng build veridex-ui

# Build the interactive Showcase application
npx ng build showcase

# Run unit tests
npx ng test veridex-ui --watch=false

# Serve Showcase App locally
npx ng serve showcase
```

---

## 📄 License

MIT © VeriDex Solutions
