import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';
import { VxButtonComponent } from '../button/button.component';

export type VxModalSize = 'sm' | 'md' | 'lg' | 'fullscreen';

@Component({
  selector: 'vx-modal',
  standalone: true,
  imports: [CommonModule, VxIconComponent, VxButtonComponent],
  template: `
    <div *ngIf="open" class="vdx-modal-backdrop" (click)="onBackdropClick()">
      <div
        [class]="'vdx-modal vdx-modal--' + size"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title"
        (click)="$event.stopPropagation()">
        
        <header class="vdx-modal__header">
          <h2 class="vdx-modal__title">{{ title }}</h2>
          <button
            type="button"
            class="vdx-modal__close"
            aria-label="Close dialog"
            (click)="close()">
            <vx-icon name="x" size="md"></vx-icon>
          </button>
        </header>

        <div class="vdx-modal__body">
          <ng-content></ng-content>
        </div>

        <footer class="vdx-modal__footer">
          <ng-content select="[footer]"></ng-content>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .vdx-modal-backdrop {
      position: fixed;
      inset: 0;
      background-color: var(--vdx-color-bg-overlay);
      z-index: var(--vdx-z-modal, 300);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--vdx-space-4);
    }
    .vdx-modal {
      background: var(--vdx-color-bg-surface);
      border-radius: var(--vdx-radius-xl);
      box-shadow: var(--vdx-shadow-2xl);
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: vdx-modal-pop 0.2s ease-out;
    }
    .vdx-modal--sm { max-width: 480px; }
    .vdx-modal--md { max-width: 640px; }
    .vdx-modal--lg { max-width: 800px; }
    .vdx-modal--fullscreen { max-width: 100vw; height: 100vh; max-height: 100vh; border-radius: 0; }

    .vdx-modal__header {
      padding: var(--vdx-space-5) var(--vdx-space-6);
      border-bottom: 1px solid var(--vdx-color-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .vdx-modal__title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--vdx-color-text-primary);
      margin: 0;
    }
    .vdx-modal__close {
      border: none;
      background: none;
      color: var(--vdx-color-text-secondary);
      cursor: pointer;
      padding: var(--vdx-space-1);
      border-radius: var(--vdx-radius-sm);
    }
    .vdx-modal__close:hover { background-color: var(--vdx-color-bg-subtle); }

    .vdx-modal__body {
      padding: var(--vdx-space-6);
      overflow-y: auto;
      flex: 1;
      color: var(--vdx-color-text-secondary);
    }
    .vdx-modal__footer {
      padding: var(--vdx-space-4) var(--vdx-space-6);
      border-top: 1px solid var(--vdx-color-border-subtle);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--vdx-space-3);
      background-color: var(--vdx-color-bg-subtle);
    }

    @keyframes vdx-modal-pop {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxModalComponent {
  @Input() open: boolean = false;
  @Input({ required: true }) title!: string;
  @Input() size: VxModalSize = 'md';
  @Input() closeOnBackdropClick: boolean = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.close();
    }
  }

  onBackdropClick(): void {
    if (this.closeOnBackdropClick) {
      this.close();
    }
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }
}
