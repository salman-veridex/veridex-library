import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vx-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      [class]="'vdx-spinner vdx-spinner--' + size"
      role="status"
      [attr.aria-label]="ariaLabel || 'Loading'">
      <svg class="vdx-spinner__svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.2"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
    </span>
  `,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; }
    .vdx-spinner {
      display: inline-block;
      color: var(--vdx-color-action-primary);
    }
    .vdx-spinner--sm { width: 16px; height: 16px; }
    .vdx-spinner--md { width: 24px; height: 24px; }
    .vdx-spinner--lg { width: 36px; height: 36px; }
    .vdx-spinner__svg {
      width: 100%;
      height: 100%;
      animation: vdx-spin 0.8s linear infinite;
    }
    @keyframes vdx-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() ariaLabel?: string;
}

@Component({
  selector: 'vx-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="'vdx-skeleton vdx-skeleton--' + shape"
      [style.width]="width"
      [style.height]="height">
    </div>
  `,
  styles: [`
    .vdx-skeleton {
      background: linear-gradient(
        90deg,
        var(--vdx-color-skeleton-base) 25%,
        var(--vdx-color-skeleton-shimmer) 37%,
        var(--vdx-color-skeleton-base) 63%
      );
      background-size: 400% 100%;
      animation: vdx-skeleton-loading 1.4s ease infinite;
      border-radius: var(--vdx-radius-sm);
    }

    .vdx-skeleton--text { height: 1em; margin-bottom: 0.5em; width: 100%; }
    .vdx-skeleton--rect { width: 100%; height: 100px; }
    .vdx-skeleton--circle { border-radius: 50%; width: 40px; height: 40px; }

    @keyframes vdx-skeleton-loading {
      0% { background-position: 100% 50%; }
      100% { background-position: 0 50%; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxSkeletonComponent {
  @Input() width: string = '100%';
  @Input() height: string = '20px';
  @Input() shape: 'text' | 'rect' | 'circle' = 'text';
}

@Component({
  selector: 'vx-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-progress">
      <div *ngIf="showLabel" class="vdx-progress__header">
        <span class="vdx-progress__label">{{ label }}</span>
        <span class="vdx-progress__percentage">{{ percentage }}%</span>
      </div>
      <div
        class="vdx-progress__track"
        role="progressbar"
        [attr.aria-valuenow]="value"
        [attr.aria-valuemin]="0"
        [attr.aria-valuemax]="max"
        [attr.aria-label]="label || 'Progress'">
        <div
          [class]="'vdx-progress__bar vdx-progress__bar--' + variant"
          [style.width.%]="percentage">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vdx-progress { width: 100%; }
    .vdx-progress__header {
      display: flex;
      justify-content: space-between;
      font-family: var(--vdx-type-family-primary);
      font-size: 13px;
      font-weight: 500;
      color: var(--vdx-color-text-secondary);
      margin-bottom: var(--vdx-space-1-5);
    }
    .vdx-progress__track {
      height: 8px;
      background-color: var(--vdx-color-bg-muted);
      border-radius: var(--vdx-radius-full);
      overflow: hidden;
    }
    .vdx-progress__bar {
      height: 100%;
      transition: width 0.3s ease;
      border-radius: var(--vdx-radius-full);
    }
    .vdx-progress__bar--primary { background-color: var(--vdx-color-action-primary); }
    .vdx-progress__bar--success { background-color: var(--vdx-primitive-green-500); }
    .vdx-progress__bar--error { background-color: var(--vdx-primitive-red-600); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxProgressBarComponent {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() label?: string;
  @Input() showLabel: boolean = false;
  @Input() variant: 'primary' | 'success' | 'error' = 'primary';

  get percentage(): number {
    if (this.max <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((this.value / this.max) * 100)));
  }
}
