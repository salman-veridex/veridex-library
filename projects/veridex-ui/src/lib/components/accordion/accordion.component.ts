import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

@Component({
  selector: 'vx-accordion-item',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div class="vdx-accordion-item" [class.vdx-accordion-item--expanded]="expanded()">
      <button
        type="button"
        class="vdx-accordion-header"
        [attr.aria-expanded]="expanded()"
        (click)="toggle()">
        <span class="vdx-accordion-title">{{ title }}</span>
        <vx-icon
          name="chevron-down"
          size="sm"
          class="vdx-accordion-icon"
          [class.vdx-accordion-icon--rotated]="expanded()">
        </vx-icon>
      </button>

      <div *ngIf="expanded()" class="vdx-accordion-content" role="region">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .vdx-accordion-item {
      border: 1px solid var(--vdx-color-border-subtle);
      border-radius: var(--vdx-radius-md);
      background-color: var(--vdx-color-bg-surface);
      overflow: hidden;
      margin-bottom: var(--vdx-space-2);
    }
    .vdx-accordion-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--vdx-space-4);
      background: none;
      border: none;
      font-family: var(--vdx-type-family-primary);
      font-size: 15px;
      font-weight: 600;
      color: var(--vdx-color-text-primary);
      cursor: pointer;
      text-align: left;
    }
    .vdx-accordion-header:hover { background-color: var(--vdx-color-bg-subtle); }
    .vdx-accordion-icon {
      transition: transform 0.2s ease;
      color: var(--vdx-color-text-secondary);
    }
    .vdx-accordion-icon--rotated { transform: rotate(180deg); }
    .vdx-accordion-content {
      padding: var(--vdx-space-4);
      border-top: 1px solid var(--vdx-color-border-subtle);
      color: var(--vdx-color-text-secondary);
      font-size: 14px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxAccordionItemComponent {
  @Input({ required: true }) title!: string;
  @Input() initialExpanded: boolean = false;
  expanded = signal(false);

  @Output() expandedChange = new EventEmitter<boolean>();

  ngOnInit() {
    this.expanded.set(this.initialExpanded);
  }

  toggle(): void {
    this.expanded.update(v => !v);
    this.expandedChange.emit(this.expanded());
  }
}

@Component({
  selector: 'vx-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-accordion">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .vdx-accordion { width: 100%; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxAccordionComponent {}
