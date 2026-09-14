import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

export type VxAlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'vx-alert',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div
      *ngIf="visible()"
      [class]="'vdx-alert vdx-alert--' + variant"
      role="alert">
      
      <vx-icon [name]="getIcon()" size="md" class="vdx-alert__icon"></vx-icon>
      
      <div class="vdx-alert__content">
        <h4 *ngIf="title" class="vdx-alert__title">{{ title }}</h4>
        <div class="vdx-alert__body"><ng-content></ng-content></div>
      </div>

      <button
        *ngIf="dismissible"
        type="button"
        class="vdx-alert__close"
        aria-label="Dismiss alert"
        (click)="dismiss()">
        <vx-icon name="x" size="xs"></vx-icon>
      </button>
    </div>
  `,
  styles: [`
    .vdx-alert {
      display: flex;
      align-items: flex-start;
      gap: var(--vdx-space-3);
      padding: var(--vdx-space-4);
      border-radius: var(--vdx-radius-md);
      border: 1px solid transparent;
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
      margin-bottom: var(--vdx-space-4);
    }
    .vdx-alert--info {
      background-color: var(--vdx-color-status-info-bg);
      border-color: var(--vdx-color-status-info-border);
      color: var(--vdx-color-status-info-text);
    }
    .vdx-alert--success {
      background-color: var(--vdx-color-status-success-bg);
      border-color: var(--vdx-color-status-success-border);
      color: var(--vdx-color-status-success-text);
    }
    .vdx-alert--warning {
      background-color: var(--vdx-color-status-warning-bg);
      border-color: var(--vdx-color-status-warning-border);
      color: var(--vdx-color-status-warning-text);
    }
    .vdx-alert--error {
      background-color: var(--vdx-color-status-error-bg);
      border-color: var(--vdx-color-status-error-border);
      color: var(--vdx-color-status-error-text);
    }

    .vdx-alert__icon { flex-shrink: 0; margin-top: 2px; }
    .vdx-alert__content { flex: 1; }
    .vdx-alert__title { font-weight: 600; margin: 0 0 2px 0; font-size: 14px; }
    .vdx-alert__body { color: inherit; line-height: 1.45; }

    .vdx-alert__close {
      border: none;
      background: none;
      color: currentColor;
      cursor: pointer;
      padding: 2px;
      opacity: 0.8;
    }
    .vdx-alert__close:hover { opacity: 1; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxAlertComponent {
  @Input() variant: VxAlertVariant = 'info';
  @Input() title?: string;
  @Input() dismissible: boolean = false;

  @Output() dismissed = new EventEmitter<void>();

  visible = signal(true);

  getIcon(): string {
    switch (this.variant) {
      case 'success': return 'check-circle';
      case 'error': return 'x-circle';
      case 'warning': return 'alert-triangle';
      default: return 'info';
    }
  }

  dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}

@Component({
  selector: 'vx-alert-banner',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div
      *ngIf="visible()"
      [class]="'vdx-alert-banner vdx-alert-banner--' + variant"
      role="banner">
      <div class="vdx-alert-banner__container">
        <vx-icon [name]="getIcon()" size="md"></vx-icon>
        <span class="vdx-alert-banner__text"><ng-content></ng-content></span>
        <button
          *ngIf="dismissible"
          type="button"
          class="vdx-alert-banner__close"
          aria-label="Dismiss banner"
          (click)="dismiss()">
          <vx-icon name="x" size="xs"></vx-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .vdx-alert-banner {
      width: 100%;
      padding: var(--vdx-space-2.5) var(--vdx-space-4);
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
      font-weight: 500;
    }
    .vdx-alert-banner--warning {
      background-color: var(--vdx-primitive-amber-500);
      color: var(--vdx-primitive-navy-900);
    }
    .vdx-alert-banner--info {
      background-color: var(--vdx-primitive-navy-900);
      color: white;
    }
    .vdx-alert-banner__container {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--vdx-space-3);
    }
    .vdx-alert-banner__text { flex: 1; text-align: center; }
    .vdx-alert-banner__close { border: none; background: none; color: inherit; cursor: pointer; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxAlertBannerComponent {
  @Input() variant: 'info' | 'warning' = 'warning';
  @Input() dismissible: boolean = true;
  @Output() dismissed = new EventEmitter<void>();

  visible = signal(true);

  getIcon(): string {
    return this.variant === 'warning' ? 'alert-triangle' : 'info';
  }

  dismiss(): void {
    this.visible.set(false);
    this.dismissed.emit();
  }
}
