import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vx-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="level">
      <h1 *ngSwitchCase="1" class="vdx-h1" [class]="customClass"><ng-content></ng-content></h1>
      <h2 *ngSwitchCase="2" class="vdx-h2" [class]="customClass"><ng-content></ng-content></h2>
      <h3 *ngSwitchCase="3" class="vdx-h3" [class]="customClass"><ng-content></ng-content></h3>
      <h4 *ngSwitchCase="4" class="vdx-h4" [class]="customClass"><ng-content></ng-content></h4>
      <h5 *ngSwitchCase="5" class="vdx-h5" [class]="customClass"><ng-content></ng-content></h5>
      <h6 *ngSwitchDefault class="vdx-h6" [class]="customClass"><ng-content></ng-content></h6>
    </ng-container>
  `,
  styles: [`
    h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; font-family: var(--vdx-type-family-primary); color: var(--vdx-color-text-primary); }
    .vdx-h1 { font-size: 1.75rem; font-weight: 700; line-height: 1.25; letter-spacing: -0.02em; }
    .vdx-h2 { font-size: 1.5rem; font-weight: 600; line-height: 1.3; letter-spacing: -0.015em; }
    .vdx-h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.35; letter-spacing: -0.01em; }
    .vdx-h4 { font-size: 1.125rem; font-weight: 600; line-height: 1.4; }
    .vdx-h5 { font-size: 1rem; font-weight: 600; line-height: 1.45; }
    .vdx-h6 { font-size: 0.875rem; font-weight: 600; line-height: 1.5; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxHeadingComponent {
  @Input() level: 1 | 2 | 3 | 4 | 5 | 6 = 1;
  @Input() customClass: string = '';
}

@Component({
  selector: 'vx-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p [class]="'vdx-text vdx-text--' + size + ' vdx-text--' + variant + ' ' + customClass">
      <ng-content></ng-content>
    </p>
  `,
  styles: [`
    p { margin: 0; font-family: var(--vdx-type-family-primary); }
    .vdx-text--lg { font-size: 1.125rem; line-height: 1.5; }
    .vdx-text--md { font-size: 1rem; line-height: 1.5; }
    .vdx-text--sm { font-size: 0.875rem; line-height: 1.45; }
    .vdx-text--xs { font-size: 0.75rem; line-height: 1.4; }

    .vdx-text--primary { color: var(--vdx-color-text-primary); }
    .vdx-text--secondary { color: var(--vdx-color-text-secondary); }
    .vdx-text--tertiary { color: var(--vdx-color-text-tertiary); }
    .vdx-text--inverse { color: var(--vdx-color-text-inverse); }
    .vdx-text--error { color: var(--vdx-color-text-error); }
    .vdx-text--success { color: var(--vdx-color-text-success); }
    .vdx-text--warning { color: var(--vdx-color-text-warning); }
    .vdx-text--info { color: var(--vdx-color-text-info); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxTextComponent {
  @Input() size: 'lg' | 'md' | 'sm' | 'xs' = 'md';
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'error' | 'success' | 'warning' | 'info' = 'primary';
  @Input() customClass: string = '';
}

@Component({
  selector: 'vx-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label [attr.for]="htmlFor" class="vdx-label" [class.vdx-label--required]="required">
      <ng-content></ng-content>
      <span *ngIf="required" class="vdx-label__asterisk" aria-hidden="true">*</span>
    </label>
  `,
  styles: [`
    .vdx-label {
      display: inline-block;
      font-family: var(--vdx-type-family-primary);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--vdx-color-text-primary);
      margin-bottom: var(--vdx-space-1-5);
    }
    .vdx-label__asterisk {
      color: var(--vdx-color-text-error);
      margin-left: 2px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxLabelComponent {
  @Input() htmlFor?: string;
  @Input() required: boolean = false;
}

@Component({
  selector: 'vx-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <code *ngIf="!block" class="vdx-code"><ng-content></ng-content></code>
    <pre *ngIf="block" class="vdx-code-block"><code class="vdx-code"><ng-content></ng-content></code></pre>
  `,
  styles: [`
    .vdx-code {
      font-family: var(--vdx-type-family-mono);
      font-size: 0.875em;
      background-color: var(--vdx-color-bg-muted);
      color: var(--vdx-color-text-primary);
      padding: 0.15em 0.4em;
      border-radius: var(--vdx-radius-xs);
    }
    .vdx-code-block {
      background-color: var(--vdx-color-bg-muted);
      padding: var(--vdx-space-4);
      border-radius: var(--vdx-radius-md);
      overflow-x: auto;
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VxCodeComponent {
  @Input() block: boolean = false;
}
