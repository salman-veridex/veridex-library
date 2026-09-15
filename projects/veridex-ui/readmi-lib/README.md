# @veridex/ui library guide

This folder documents the public Angular library in `projects/veridex-ui`.

## Install and import

```bash
npm install @veridex/ui
```

Import the global stylesheet once in the consuming application's `styles.css` or `styles.scss`:

```scss
@import '@veridex/ui/styles/vdx-global.css';
```

Import standalone components from the package and add them to the consuming component's `imports` array:

```typescript
import { Component } from '@angular/core';
import { VxButtonComponent, VxCardComponent } from '@veridex/ui';

@Component({
  selector: 'app-example',
  imports: [VxButtonComponent, VxCardComponent],
  template: `
    <vx-card>
      <button vx-button (clicked)="save()">Save</button>
    </vx-card>
  `,
})
export class ExampleComponent {
  save(): void {}
}
```

The library uses standalone components. Add only the components/directives used by a template. For forms using `[(ngModel)]` or reactive forms, also import the relevant Angular forms package in the consuming application.

## Documentation map

- [Component catalog and usage](./COMPONENTS.md)
- [Components JSON catalog](./components.json)
- [Global CSS classes, tokens and import rules](./GLOBAL-CSS-CLASSES.md)

## Conventions

- Inputs are supplied with Angular property binding, for example `[items]="items"`.
- Outputs are listened to with event binding, for example `(closed)="onClosed()"`.
- Two-way bindings use the documented `[(...)]` pair, for example `[(open)]` or `[(selectedDate)]`.
- Required inputs are marked `required` in the catalog and must be provided.
- Components are `OnPush`; update arrays/objects immutably when changing bound data.
- `vx-icon` uses the icon name string supported by the library. Give interactive icon-only controls an `ariaLabel`.

## Build the library locally

```bash
ng build veridex-ui
```

The package exports its TypeScript API from `src/public-api.ts` and its stylesheet from `@veridex/ui/styles/vdx-global.css`.
