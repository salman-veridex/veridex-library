import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

@Component({
  selector: 'vx-drawer',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div *ngIf="open" class="vdx-drawer-backdrop" (click)="close()">
      <div
        [class]="'vdx-drawer vdx-drawer--' + position"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title"
        (click)="$event.stopPropagation()">
        
        <header class="vdx-drawer__header">
          <h2 class="vdx-drawer__title">{{ title }}</h2>
          <button
            type="button"
            class="vdx-drawer__close"
            aria-label="Close panel"
            (click)="close()">
            <vx-icon name="x" size="md"></vx-icon>
          </button>
        </header>

        <div class="vdx-drawer__body">
          <ng-content></ng-content>
        </div>

        <footer class="vdx-drawer__footer">
          <ng-content select="[footer]"></ng-content>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .vdx-drawer-backdrop {
      position: fixed;
      inset: 0;
      background-color: var(--vdx-color-bg-overlay);
      z-index: var(--vdx-z-modal, 300);
      display: flex;
    }
    .vdx-drawer {
      background: var(--vdx-color-bg-surface);
      width: 400px;
      max-width: 90vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--vdx-shadow-2xl);
    }
    .vdx-drawer--right { margin-left: auto; }
    .vdx-drawer--left { margin-right: auto; }

    .vdx-drawer__header {
      padding: var(--vdx-space-5);
      border-bottom: 1px solid var(--vdx-color-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .vdx-drawer__title { font-size: 1.125rem; font-weight: 600; margin: 0; }
    .vdx-drawer__close { border: none; background: none; cursor: pointer; color: var(--vdx-color-text-secondary); }

    .vdx-drawer__body { padding: var(--vdx-space-5); overflow-y: auto; flex: 1; }
    .vdx-drawer__footer {
      padding: var(--vdx-space-4) var(--vdx-space-5);
      border-top: 1px solid var(--vdx-color-border-subtle);
      background-color: var(--vdx-color-bg-subtle);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxDrawerComponent {
  @Input() open: boolean = false;
  @Input({ required: true }) title!: string;
  @Input() position: 'right' | 'left' = 'right';

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.open) this.close(); }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }
}
