import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type VxBadgeVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info' | 'primary';
export type VxBadgeSize = 'sm' | 'md';

@Component({
  selector: 'vx-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses">
      <span *ngIf="dot" class="vdx-badge__dot"></span>
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .vdx-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--vdx-type-family-primary);
      font-weight: 500;
      border-radius: var(--vdx-radius-full);
      padding: 2px 10px;
      white-space: nowrap;
    }

    .vdx-badge--sm { font-size: 12px; padding: 1px 8px; }
    .vdx-badge--md { font-size: 13px; padding: 3px 10px; }

    .vdx-badge--neutral {
      background-color: var(--vdx-color-status-neutral-bg);
      color: var(--vdx-color-status-neutral-text);
      border: 1px solid var(--vdx-color-border-subtle);
    }

    .vdx-badge--primary {
      background-color: var(--vdx-color-action-primary-subtle);
      color: var(--vdx-color-action-primary);
      border: 1px solid rgba(248, 100, 7, 0.2);
    }

    .vdx-badge--success {
      background-color: var(--vdx-color-status-success-bg);
      color: var(--vdx-color-status-success-text);
      border: 1px solid var(--vdx-color-status-success-border);
    }

    .vdx-badge--warning {
      background-color: var(--vdx-color-status-warning-bg);
      color: var(--vdx-color-status-warning-text);
      border: 1px solid var(--vdx-color-status-warning-border);
    }

    .vdx-badge--error {
      background-color: var(--vdx-color-status-error-bg);
      color: var(--vdx-color-status-error-text);
      border: 1px solid var(--vdx-color-status-error-border);
    }

    .vdx-badge--info {
      background-color: var(--vdx-color-status-info-bg);
      color: var(--vdx-color-status-info-text);
      border: 1px solid var(--vdx-color-status-info-border);
    }

    .vdx-badge__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxBadgeComponent {
  @Input() variant: VxBadgeVariant = 'neutral';
  @Input() size: VxBadgeSize = 'md';
  @Input() dot: boolean = false;
  @Input() customClass: string = '';

  get badgeClasses(): string {
    return `vdx-badge vdx-badge--${this.variant} vdx-badge--${this.size} ${this.customClass}`;
  }
}
