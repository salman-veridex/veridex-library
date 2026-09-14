import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent, VxIconSize } from '../icon/icon.component';

export type VxButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type VxButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'vx-button',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <button
      [type]="type"
      [class]="buttonClasses"
      [disabled]="disabled || loading"
      [attr.aria-disabled]="(disabled || loading) ? 'true' : null"
      [attr.aria-busy]="loading ? 'true' : null"
      [attr.aria-label]="ariaLabel || null"
      (click)="onClick($event)">
      
      <!-- Loading Spinner -->
      <span *ngIf="loading" class="vdx-btn__spinner" aria-hidden="true">
        <svg class="vdx-spinner-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
      </span>

      <!-- Leading Icon -->
      <vx-icon
        *ngIf="leadingIcon && !loading"
        [name]="leadingIcon"
        [size]="iconSize"
        class="vdx-btn__icon vdx-btn__icon--leading">
      </vx-icon>

      <!-- Button Content / Label -->
      <span class="vdx-btn__label" [class.vdx-visually-hidden]="loading && !hasContent">
        <ng-content></ng-content>
      </span>

      <!-- Trailing Icon -->
      <vx-icon
        *ngIf="trailingIcon && !loading"
        [name]="trailingIcon"
        [size]="iconSize"
        class="vdx-btn__icon vdx-btn__icon--trailing">
      </vx-icon>
    </button>
  `,
  styles: [`
    :host { display: inline-block; }
    :host(.vx-btn-full-width) { display: block; width: 100%; }

    .vdx-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--vdx-space-2);
      font-family: var(--vdx-type-family-primary);
      font-weight: 600;
      border-radius: var(--vdx-radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      transition: background-color var(--vdx-duration-fast) var(--vdx-ease-default),
                  border-color var(--vdx-duration-fast) var(--vdx-ease-default),
                  box-shadow var(--vdx-duration-fast) var(--vdx-ease-default);
      text-decoration: none;
      white-space: nowrap;
      user-select: none;
      box-sizing: border-box;
    }

    /* Sizes */
    .vdx-btn--sm { height: 32px; padding: 0 var(--vdx-space-3); font-size: 13px; }
    .vdx-btn--md { height: 40px; padding: 0 var(--vdx-space-4); font-size: 14px; }
    .vdx-btn--lg { height: 48px; padding: 0 var(--vdx-space-5); font-size: 16px; }

    /* Variants */
    .vdx-btn--primary {
      background-color: var(--vdx-color-action-primary);
      color: var(--vdx-color-action-primary-text);
      border-color: var(--vdx-color-action-primary);
    }
    .vdx-btn--primary:hover:not(:disabled) {
      background-color: var(--vdx-color-action-primary-hover);
      border-color: var(--vdx-color-action-primary-hover);
    }
    .vdx-btn--primary:active:not(:disabled) {
      background-color: var(--vdx-color-action-primary-active);
    }

    .vdx-btn--secondary {
      background-color: var(--vdx-color-action-secondary);
      color: var(--vdx-color-action-secondary-text);
      border-color: var(--vdx-color-action-secondary);
    }
    .vdx-btn--secondary:hover:not(:disabled) {
      background-color: var(--vdx-color-action-secondary-hover);
      border-color: var(--vdx-color-action-secondary-hover);
    }

    .vdx-btn--outline {
      background-color: transparent;
      color: var(--vdx-color-action-secondary);
      border-color: var(--vdx-color-border-default);
    }
    .vdx-btn--outline:hover:not(:disabled) {
      background-color: var(--vdx-color-action-ghost-hover);
      border-color: var(--vdx-color-border-strong);
    }

    .vdx-btn--ghost {
      background-color: transparent;
      color: var(--vdx-color-action-secondary);
      border-color: transparent;
    }
    .vdx-btn--ghost:hover:not(:disabled) {
      background-color: var(--vdx-color-action-ghost-hover);
    }

    .vdx-btn--destructive {
      background-color: var(--vdx-color-action-destructive);
      color: var(--vdx-color-action-destructive-text);
      border-color: var(--vdx-color-action-destructive);
    }
    .vdx-btn--destructive:hover:not(:disabled) {
      background-color: var(--vdx-color-action-destructive-hover);
    }

    /* States */
    .vdx-btn:disabled, .vdx-btn--disabled {
      background-color: var(--vdx-color-action-disabled-bg) !important;
      color: var(--vdx-color-action-disabled-text) !important;
      border-color: var(--vdx-color-action-disabled-bg) !important;
      cursor: not-allowed;
      opacity: 0.7;
    }

    .vdx-btn:focus-visible {
      outline: 3px solid var(--vdx-color-border-focus);
      outline-offset: 2px;
    }

    .vdx-btn--full-width { width: 100%; }

    /* Loading Spinner */
    .vdx-btn__spinner {
      display: inline-flex;
      align-items: center;
    }
    .vdx-spinner-svg {
      width: 18px;
      height: 18px;
      animation: vdx-spin 0.8s linear infinite;
    }
    @keyframes vdx-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxButtonComponent {
  @Input() variant: VxButtonVariant = 'primary';
  @Input() size: VxButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() leadingIcon?: string;
  @Input() trailingIcon?: string;
  @Input() ariaLabel?: string;
  @Input() customClass: string = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  hasContent = true;

  get buttonClasses(): string {
    return [
      'vdx-btn',
      `vdx-btn--${this.variant}`,
      `vdx-btn--${this.size}`,
      this.fullWidth ? 'vdx-btn--full-width' : '',
      this.disabled || this.loading ? 'vdx-btn--disabled' : '',
      this.customClass,
    ].filter(Boolean).join(' ');
  }

  get iconSize(): VxIconSize {
    if (this.size === 'sm') return 'sm';
    if (this.size === 'lg') return 'lg';
    return 'md';
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}

@Component({
  selector: 'vx-button-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-btn-group" role="group">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .vdx-btn-group {
      display: inline-flex;
      border-radius: var(--vdx-radius-md);
    }
    ::ng-deep .vdx-btn-group > vx-button:not(:first-child) .vdx-btn {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-left: -1px;
    }
    ::ng-deep .vdx-btn-group > vx-button:not(:last-child) .vdx-btn {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxButtonGroupComponent {}

@Component({
  selector: 'vx-icon-button',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <button
      [type]="type"
      [class]="'vdx-btn vdx-btn-icon vdx-btn--' + variant + ' vdx-btn--' + size + ' ' + customClass"
      [disabled]="disabled || loading"
      [attr.aria-label]="ariaLabel"
      (click)="onClick($event)">
      <vx-icon [name]="icon" [size]="iconSize"></vx-icon>
    </button>
  `,
  styles: [`
    .vdx-btn-icon {
      padding: 0 !important;
      aspect-ratio: 1;
      justify-content: center;
    }
    .vdx-btn--sm { width: 32px; height: 32px; }
    .vdx-btn--md { width: 40px; height: 40px; }
    .vdx-btn--lg { width: 48px; height: 48px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxIconButtonComponent {
  @Input() icon: string = 'circle';
  @Input() variant: VxButtonVariant = 'ghost';
  @Input() size: VxButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input({ required: true }) ariaLabel!: string;
  @Input() customClass: string = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  get iconSize(): VxIconSize {
    if (this.size === 'sm') return 'sm';
    if (this.size === 'lg') return 'lg';
    return 'md';
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
