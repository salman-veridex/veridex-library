import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

@Component({
  selector: 'vx-chip',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <button
      type="button"
      [class]="chipClasses"
      [disabled]="disabled"
      [attr.aria-pressed]="selectable ? selected : null"
      (click)="onClick($event)">
      
      <vx-icon *ngIf="icon" [name]="icon" size="sm" class="vdx-chip__icon"></vx-icon>
      
      <span class="vdx-chip__label"><ng-content></ng-content></span>

      <button
        *ngIf="removable"
        type="button"
        class="vdx-chip__remove"
        aria-label="Remove chip"
        (click)="onRemove($event)">
        <vx-icon name="x" size="xs"></vx-icon>
      </button>
    </button>
  `,
  styles: [`
    .vdx-chip {
      display: inline-flex;
      align-items: center;
      gap: var(--vdx-space-1-5);
      font-family: var(--vdx-type-family-primary);
      font-size: 13px;
      font-weight: 500;
      height: 32px;
      padding: 0 var(--vdx-space-3);
      border-radius: var(--vdx-radius-full);
      border: 1px solid var(--vdx-color-border-strong);
      background-color: var(--vdx-color-bg-surface);
      color: var(--vdx-color-text-primary);
      cursor: pointer;
      transition: all var(--vdx-duration-fast) var(--vdx-ease-default);
    }

    .vdx-chip:hover:not(:disabled) {
      background-color: var(--vdx-color-bg-subtle);
    }

    .vdx-chip--selected {
      background-color: var(--vdx-color-action-primary-subtle);
      border-color: var(--vdx-color-action-primary);
      color: var(--vdx-color-action-primary);
      font-weight: 600;
    }

    .vdx-chip:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .vdx-chip__remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      padding: 2px;
      margin-right: -4px;
      border-radius: 50%;
      cursor: pointer;
      color: currentColor;
    }
    .vdx-chip__remove:hover {
      background-color: rgba(0,0,0,0.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxChipComponent {
  @Input() selected: boolean = false;
  @Input() selectable: boolean = true;
  @Input() removable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon?: string;

  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() removed = new EventEmitter<void>();

  get chipClasses(): string {
    return `vdx-chip ${this.selected ? 'vdx-chip--selected' : ''}`;
  }

  onClick(event: MouseEvent): void {
    if (this.disabled) return;
    if (this.selectable) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.removed.emit();
    }
  }
}

@Component({
  selector: 'vx-chip-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-chip-group">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .vdx-chip-group {
      display: flex;
      flex-wrap: wrap;
      gap: var(--vdx-space-2);
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxChipGroupComponent {}
