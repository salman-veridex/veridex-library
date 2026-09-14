import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vx-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="active" class="vdx-tab-panel" role="tabpanel">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .vdx-tab-panel {
      padding-top: var(--vdx-space-4);
      outline: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxTabComponent {
  @Input({ required: true }) label!: string;
  @Input() disabled: boolean = false;
  active: boolean = false;
}

@Component({
  selector: 'vx-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-tabs">
      <div class="vdx-tabs__nav" role="tablist">
        <button
          *ngFor="let tab of tabs; let i = index"
          type="button"
          role="tab"
          [class.vdx-tabs__item--active]="i === selectedIndex"
          [disabled]="tab.disabled"
          [attr.aria-selected]="i === selectedIndex"
          class="vdx-tabs__item"
          (click)="selectTab(i)">
          {{ tab.label }}
        </button>
      </div>

      <div class="vdx-tabs__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .vdx-tabs { width: 100%; }
    .vdx-tabs__nav {
      display: flex;
      border-bottom: 1px solid var(--vdx-color-border-subtle);
      gap: var(--vdx-space-2);
    }
    .vdx-tabs__item {
      padding: var(--vdx-space-3) var(--vdx-space-4);
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
      font-weight: 500;
      color: var(--vdx-color-text-secondary);
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .vdx-tabs__item:hover:not(:disabled) {
      color: var(--vdx-color-text-primary);
    }
    .vdx-tabs__item--active {
      color: var(--vdx-color-action-primary) !important;
      border-bottom-color: var(--vdx-color-action-primary) !important;
      font-weight: 600;
    }
    .vdx-tabs__item:disabled {
      color: var(--vdx-color-text-disabled);
      cursor: not-allowed;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxTabsComponent implements AfterContentInit {
  @Input() selectedIndex: number = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  @ContentChildren(VxTabComponent) tabs!: QueryList<VxTabComponent>;

  ngAfterContentInit(): void {
    this.updateTabVisibility();
    this.tabs.changes.subscribe(() => this.updateTabVisibility());
  }

  selectTab(index: number): void {
    if (this.tabs.toArray()[index]?.disabled) return;
    this.selectedIndex = index;
    this.updateTabVisibility();
    this.selectedIndexChange.emit(this.selectedIndex);
  }

  private updateTabVisibility(): void {
    if (this.tabs) {
      this.tabs.forEach((tab, idx) => {
        tab.active = idx === this.selectedIndex;
      });
    }
  }
}
