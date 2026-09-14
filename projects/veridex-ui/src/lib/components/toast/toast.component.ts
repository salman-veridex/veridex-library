import { Component, Injectable, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

export type VxToastSeverity = 'success' | 'error' | 'warning' | 'info';

export interface VxToast {
  id: string;
  message: string;
  severity: VxToastSeverity;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class VxToastService {
  toasts = signal<VxToast[]>([]);

  show(message: string, severity: VxToastSeverity = 'info', duration: number = 5000): void {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: VxToast = { id, message, severity, duration };
    this.toasts.update(list => [...list.slice(-3), newToast]); // Keep max 4

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  success(message: string, duration?: number): void { this.show(message, 'success', duration); }
  error(message: string, duration?: number): void { this.show(message, 'error', duration); }
  warning(message: string, duration?: number): void { this.show(message, 'warning', duration); }
  info(message: string, duration?: number): void { this.show(message, 'info', duration); }

  dismiss(id: string): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}

@Component({
  selector: 'vx-toast-container',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div
      class="vdx-toast-container"
      role="region"
      aria-label="Notifications"
      aria-live="polite">
      
      <div
        *ngFor="let toast of toastService.toasts()"
        [class]="'vdx-toast vdx-toast--' + toast.severity">
        
        <vx-icon [name]="getIcon(toast.severity)" size="md" class="vdx-toast__icon"></vx-icon>
        <span class="vdx-toast__message">{{ toast.message }}</span>

        <button
          type="button"
          class="vdx-toast__close"
          aria-label="Dismiss notification"
          (click)="toastService.dismiss(toast.id)">
          <vx-icon name="x" size="xs"></vx-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .vdx-toast-container {
      position: fixed;
      bottom: var(--vdx-space-6);
      right: var(--vdx-space-6);
      z-index: var(--vdx-z-toast, 400);
      display: flex;
      flex-direction: column;
      gap: var(--vdx-space-3);
      max-width: 380px;
      width: 100%;
      pointer-events: none;
    }

    .vdx-toast {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: var(--vdx-space-3);
      padding: var(--vdx-space-3) var(--vdx-space-4);
      border-radius: var(--vdx-radius-md);
      box-shadow: var(--vdx-shadow-lg);
      background-color: var(--vdx-color-bg-surface);
      border-left: 4px solid currentColor;
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
      animation: vdx-toast-in 0.3s ease-out;
    }

    .vdx-toast--success { border-left-color: var(--vdx-primitive-green-600); color: var(--vdx-color-text-primary); }
    .vdx-toast--error { border-left-color: var(--vdx-primitive-red-600); color: var(--vdx-color-text-primary); }
    .vdx-toast--warning { border-left-color: var(--vdx-primitive-amber-600); color: var(--vdx-color-text-primary); }
    .vdx-toast--info { border-left-color: var(--vdx-primitive-blue-600); color: var(--vdx-color-text-primary); }

    .vdx-toast__icon { flex-shrink: 0; }
    .vdx-toast--success .vdx-toast__icon { color: var(--vdx-primitive-green-600); }
    .vdx-toast--error .vdx-toast__icon { color: var(--vdx-primitive-red-600); }
    .vdx-toast--warning .vdx-toast__icon { color: var(--vdx-primitive-amber-600); }
    .vdx-toast--info .vdx-toast__icon { color: var(--vdx-primitive-blue-600); }

    .vdx-toast__message { flex: 1; font-weight: 500; }
    .vdx-toast__close {
      border: none;
      background: none;
      color: var(--vdx-color-text-tertiary);
      cursor: pointer;
      padding: 2px;
    }
    .vdx-toast__close:hover { color: var(--vdx-color-text-primary); }

    @keyframes vdx-toast-in {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxToastContainerComponent {
  constructor(public toastService: VxToastService) {}

  getIcon(severity: VxToastSeverity): string {
    switch (severity) {
      case 'success': return 'check-circle';
      case 'error': return 'x-circle';
      case 'warning': return 'alert-triangle';
      default: return 'info';
    }
  }
}
