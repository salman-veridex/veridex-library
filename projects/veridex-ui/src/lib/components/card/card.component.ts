import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type VxCardVariant = 'default' | 'raised' | 'selected' | 'compact' | 'comfortable' | 'flat' | 'clickable';

@Component({
  selector: 'vx-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="cardClasses"
      [attr.role]="isInteractive ? 'button' : null"
      [attr.tabindex]="isInteractive ? 0 : null"
      (click)="onClick($event)"
      (keydown.enter)="onClick($event)"
      (keydown.space)="onClick($event)">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .vdx-card {
      background: var(--vdx-color-bg-surface);
      border: 1px solid var(--vdx-color-border-subtle);
      border-radius: var(--vdx-radius-lg);
      box-shadow: var(--vdx-shadow-xs);
      padding: var(--vdx-space-6);
      transition: all var(--vdx-duration-fast) var(--vdx-ease-default);
      box-sizing: border-box;
    }

    .vdx-card--compact { padding: var(--vdx-space-4); }
    .vdx-card--comfortable { padding: var(--vdx-space-8); }

    .vdx-card--raised {
      box-shadow: var(--vdx-shadow-md);
      border-color: transparent;
    }

    .vdx-card--flat {
      box-shadow: none;
      border-color: var(--vdx-color-border-subtle);
      background-color: var(--vdx-color-bg-subtle);
    }

    .vdx-card--selected {
      border: 2px solid var(--vdx-color-action-primary);
      background-color: rgba(248, 100, 7, 0.04);
    }

    .vdx-card--clickable {
      cursor: pointer;
    }
    .vdx-card--clickable:hover {
      box-shadow: var(--vdx-shadow-md);
      border-color: var(--vdx-color-border-strong);
      transform: translateY(-1px);
    }

    .vdx-card:focus-visible {
      outline: 3px solid var(--vdx-color-border-focus);
      outline-offset: 2px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxCardComponent {
  @Input() variant: VxCardVariant = 'default';
  @Input() selected: boolean = false;
  @Input() customClass: string = '';

  @Output() clicked = new EventEmitter<Event>();

  get isInteractive(): boolean {
    return this.variant === 'clickable' || this.selected;
  }

  get cardClasses(): string {
    const classes = ['vdx-card', `vdx-card--${this.variant}`];
    if (this.selected) classes.push('vdx-card--selected');
    if (this.customClass) classes.push(this.customClass);
    return classes.join(' ');
  }

  onClick(event: Event): void {
    if (this.isInteractive) {
      this.clicked.emit(event);
    }
  }
}

@Component({
  selector: 'vx-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="vdx-card-header"><ng-content></ng-content></div>`,
  styles: [`
    .vdx-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--vdx-space-4);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxCardHeaderComponent {}

@Component({
  selector: 'vx-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `<h3 class="vdx-card-title"><ng-content></ng-content></h3>`,
  styles: [`
    .vdx-card-title {
      font-family: var(--vdx-type-family-primary);
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--vdx-color-text-primary);
      margin: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxCardTitleComponent {}

@Component({
  selector: 'vx-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="vdx-card-content"><ng-content></ng-content></div>`,
  styles: [`
    .vdx-card-content {
      color: var(--vdx-color-text-secondary);
      font-size: 0.875rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxCardContentComponent {}

@Component({
  selector: 'vx-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="vdx-card-footer"><ng-content></ng-content></div>`,
  styles: [`
    .vdx-card-footer {
      margin-top: var(--vdx-space-5);
      padding-top: var(--vdx-space-4);
      border-top: 1px solid var(--vdx-color-border-subtle);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--vdx-space-3);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxCardFooterComponent {}
