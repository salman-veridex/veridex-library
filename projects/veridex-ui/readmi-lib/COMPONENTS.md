# Component catalog

All examples assume the component is imported from `@veridex/ui` and added to the consuming standalone component's `imports` array.

## Icon and typography

### `vx-icon` - `VxIconComponent`
Inputs: `name` (default `circle`), `size` (`xs | sm | md | lg | xl | 2xl`), `ariaLabel`, `customClass`.

```html
<vx-icon name="search" size="md" ariaLabel="Search"></vx-icon>
```

### `vx-heading`, `vx-text`, `vx-label`, `vx-code`
`VxHeadingComponent`: `level` (`1..6`), `customClass`.
`VxTextComponent`: `size` (`lg | md | sm | xs`), `variant` (`primary | secondary | tertiary | inverse | error | success | warning | info`), `customClass`.
`VxLabelComponent`: `htmlFor`, `required`, `block`, `customClass`.
`VxCodeComponent`: `customClass`.

```html
<vx-heading [level]="2">Policy details</vx-heading>
<vx-text variant="secondary">Review the submitted information.</vx-text>
<vx-label htmlFor="policy-number" [required]="true">Policy number</vx-label>
<vx-code>POL-2024-8841</vx-code>
```

## Actions and display

### `vx-button`, `vx-icon-button`, `vx-button-group`
`vx-button` inputs: `variant`, `size`, `disabled`, `loading`, `fullWidth`, `type`, `leadingIcon`, `trailingIcon`, `ariaLabel`, `customClass`; output: `clicked`.
`vx-icon-button` inputs: `icon`, `variant`, `size`, `disabled`, `loading`, required `ariaLabel`, `customClass`; output: `clicked`.
`vx-button-group` groups button content.

```html
<vx-button variant="primary" leadingIcon="save" (clicked)="save()">Save</vx-button>
<vx-icon-button icon="more-horizontal" ariaLabel="More actions" (clicked)="openMenu()"></vx-icon-button>
<vx-button-group><vx-button>Cancel</vx-button><vx-button>Confirm</vx-button></vx-button-group>
```

### `vx-badge`, `vx-chip`, `vx-chip-group`, `vx-avatar`, `vx-avatar-group`
`vx-badge`: `variant`, `size`, `dot`, `customClass`.
`vx-chip`: `selected`, `selectable`, `removable`, `disabled`, `icon`; outputs `selectedChange`, `removed`.
`vx-avatar`: `src`, `name`, `size`, `status`. `vx-avatar-group` groups avatars.

```html
<vx-badge variant="success">Active</vx-badge>
<vx-chip icon="filter" [selectable]="true" (selectedChange)="filterOn = $event">Open</vx-chip>
<vx-avatar name="Ayesha Khan" status="online"></vx-avatar>
```

### Card components
Selectors: `vx-card`, `vx-card-header`, `vx-card-title`, `vx-card-content`, `vx-card-footer`.
`vx-card` inputs: `variant`, `selected`, `customClass`; output: `clicked`.

```html
<vx-card variant="default" (clicked)="selectCard()">
  <vx-card-header><vx-card-title>Premium</vx-card-title></vx-card-header>
  <vx-card-content>Coverage details</vx-card-content>
  <vx-card-footer><vx-button>View</vx-button></vx-card-footer>
</vx-card>
```

### `vx-spinner`, `vx-skeleton`, `vx-progress-bar`
`vx-spinner`: `size` (`sm | md | lg`), `ariaLabel`.
`vx-skeleton`: `width`, `height`, `shape` (`text | rect | circle`).
`vx-progress-bar`: `value`, `max`, `label`, `showLabel`, `variant` (`primary | success | error`).

```html
<vx-spinner size="md" ariaLabel="Loading"></vx-spinner>
<vx-skeleton width="240px" height="18px" shape="text"></vx-skeleton>
<vx-progress-bar [value]="completed" [max]="total" [showLabel]="true"></vx-progress-bar>
```

## Layout and navigation

### `vx-app-shell`, `vx-top-bar`, `vx-sidebar`, `vx-sidebar-item`
`vx-top-bar` input: `portalName`.
`vx-sidebar-item` inputs: `label`/`title`, `icon`, `active`, `href`/`path`, `children`, `currentPath`.

```html
<vx-app-shell>
  <vx-top-bar portalName="Operations"><vx-icon name="bell"></vx-icon></vx-top-bar>
  <vx-sidebar>
    <vx-sidebar-item label="Dashboard" icon="home" path="/dashboard"></vx-sidebar-item>
    <vx-sidebar-item label="Policies" icon="file-text" [children]="policyLinks"></vx-sidebar-item>
  </vx-sidebar>
  <router-outlet></router-outlet>
</vx-app-shell>
```

`vx-stack` and `vx-inline` use `gap` (`1 | 2 | 3 | 4 | 6 | 8`). `vx-grid` uses numeric `cols`.

```html
<vx-stack gap="4"><vx-heading [level]="2">Dashboard</vx-heading><ng-content></ng-content></vx-stack>
<vx-inline gap="2"><vx-badge>New</vx-badge><vx-badge>Open</vx-badge></vx-inline>
<vx-grid [cols]="3"><vx-card>One</vx-card><vx-card>Two</vx-card><vx-card>Three</vx-card></vx-grid>
```

### `vx-tabs`, `vx-tab`, `vx-accordion`, `vx-accordion-item`, `vx-stepper`, `vx-breadcrumb`
`vx-tabs`: `selectedIndex`; output `selectedIndexChange`. Children are `vx-tab` with required `label` and optional `disabled`.
`vx-accordion-item`: required `title`, `initialExpanded`; output `expandedChange`. Use inside `vx-accordion`.
`vx-stepper`: required `steps: VxStep[]`, `currentStep`; output `stepClick`.
`vx-breadcrumb`: required `items: VxBreadcrumbItem[]`.

```html
<vx-tabs [(selectedIndex)]="tabIndex">
  <vx-tab label="Overview">Overview content</vx-tab>
  <vx-tab label="Audit">Audit content</vx-tab>
</vx-tabs>
<vx-accordion><vx-accordion-item title="Details">More details</vx-accordion-item></vx-accordion>
<vx-stepper [steps]="steps" [currentStep]="currentStep" (stepClick)="goToStep($event)"></vx-stepper>
<vx-breadcrumb [items]="breadcrumbs"></vx-breadcrumb>
```

## Forms and overlays

### Form controls
Selectors: `vx-form-field`, `input[vxInput]`, `textarea[vxInput]`, `vx-input`, `vx-select`, `vx-checkbox`, `vx-toggle`, `vx-file-upload`, `vx-currency-input`, `vx-validation-summary`.

`vx-form-field`: `label`, `required`, `hint`, `error`.
`vx-input`: `type`, `placeholder`, `disabled`, `readonly`, `invalid`, `prefixIcon`, `suffixIcon`.
`vx-select`: `options: { label, value }[]`, `placeholder`, `disabled`, `invalid`.
`vx-checkbox` and `vx-toggle`: `checked`, `disabled`; output `checkedChange`.
`vx-file-upload`: `accept`, `multiple`, `hint`; output `filesSelected`.
`vx-currency-input`: `currency`, `symbol`, `disabled`.
`vx-validation-summary`: `errors: { fieldId, message }[]`.

```html
<vx-form-field label="Email" [required]="true" error="Email is required">
  <vx-input type="email" placeholder="name@example.com"></vx-input>
</vx-form-field>
<vx-select [options]="statusOptions" placeholder="Select status"></vx-select>
<vx-checkbox [(checked)]="accepted">I accept</vx-checkbox>
<vx-toggle [(checked)]="enabled">Enabled</vx-toggle>
<vx-file-upload accept=".pdf,.csv" [multiple]="true" (filesSelected)="upload($event)"></vx-file-upload>
<vx-currency-input currency="USD" symbol="$"></vx-currency-input>
<vx-validation-summary [errors]="formErrors"></vx-validation-summary>
```

Controls implementing `ControlValueAccessor` work with `[(ngModel)]` and reactive forms.

### `vx-modal` and `vx-drawer`
Both use `open`, required `title`, and output `openChange` and `closed`. Modal also supports `size` (`sm | md | lg | fullscreen`) and `closeOnBackdropClick`; drawer supports `position` (`left | right`).

```html
<vx-modal [(open)]="modalOpen" title="Confirm policy" size="md" (closed)="afterClose()">Confirmation content</vx-modal>
<vx-drawer [(open)]="drawerOpen" title="Filters" position="right">Filter controls</vx-drawer>
```

### `vx-alert`, `vx-alert-banner`, `vx-empty-state`, tooltip and popover
`vx-alert`: `variant`, `title`, `dismissible`; output `dismissed`.
`vx-alert-banner`: `variant` (`info | warning`), `dismissible`; output `dismissed`.
`vx-empty-state`: required `title`, optional `description`, `icon`.
`[vxTooltip]` takes tooltip text. `[vxPopover]` takes a template/content value.

```html
<vx-alert variant="error" title="Upload failed" [dismissible]="true" (dismissed)="clearAlert()">Try again.</vx-alert>
<vx-empty-state title="No policies" description="Create a policy to get started."></vx-empty-state>
<button [vxTooltip]="'Open filters'">Filters</button>
```

## Data and domain components

### `vx-table` - `VxDataGridComponent`
Inputs: `data`, `columns`, `density` (`compact | comfortable | spacious`), `selectable`, `loading`, `pagination`, `pageSize`, `emptyMessage`; outputs `rowClick`, `selectionChange`.

```html
<vx-table [data]="rows" [columns]="columns" [pagination]="true" [selectable]="true"
  (rowClick)="openRow($event)" (selectionChange)="selected = $event"></vx-table>
```

### `vx-kanban-board`, `vx-calendar`, `vx-timeline`
`vx-kanban-board`: required `columns: VxKanbanColumn[]`.
`vx-calendar`: `selectedDate`; output `selectedDateChange`.
`vx-timeline`: required `items: VxTimelineItem[]`.

```html
<vx-kanban-board [columns]="kanbanColumns"></vx-kanban-board>
<vx-calendar [(selectedDate)]="selectedDate"></vx-calendar>
<vx-timeline [items]="activityItems"></vx-timeline>
```

### Toast service and container
Import `VxToastContainerComponent` and place `<vx-toast-container></vx-toast-container>` once near the application root. Inject `VxToastService` and call its public notification method with a `VxToast` object. Keep the container mounted while toasts are in use.

### Insurance domain selectors
`vx-policy-status-chip` requires `status` and `label`.
`vx-kpi-card` requires `label` and `value`; optional `icon`, `trend`, `trendValue`, `trendPeriod`.
`vx-premium-card` supports `amount`, `dueDate`, `policyNo`.
`vx-notification-feed` supports `notifications`.
`vx-audit-log` supports `changes`.
`vx-login-card` and `vx-permission-matrix` support `roles` and `permissions` respectively.

```html
<vx-policy-status-chip status="active" label="Active"></vx-policy-status-chip>
<vx-kpi-card label="Written premium" [value]="12450" trend="up" trendValue="8.2%" trendPeriod="vs last month"></vx-kpi-card>
<vx-premium-card amount="$12,450.00" dueDate="Oct 15, 2026" policyNo="POL-2024-8841"></vx-premium-card>
```

Use the exported interfaces (`VxStep`, `VxBreadcrumbItem`, `VxKanbanColumn`, `VxTimelineItem`, `VxColumnDef`, etc.) from `@veridex/ui` for strongly typed input data.
