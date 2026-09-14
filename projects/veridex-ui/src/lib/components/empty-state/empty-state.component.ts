import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

@Component({
  selector: 'vx-empty-state',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div class="vdx-empty">
      <div *ngIf="icon" class="vdx-empty__icon-container">
        <vx-icon [name]="icon" size="2xl" class="vdx-empty__icon"></vx-icon>
      </div>

      <h3 class="vdx-empty__title">{{ title }}</h3>
      <p *ngIf="description" class="vdx-empty__description">{{ description }}</p>

      <div class="vdx-empty__actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .vdx-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--vdx-space-12) var(--vdx-space-6);
      background-color: var(--vdx-color-bg-surface);
      border-radius: var(--vdx-radius-lg);
      border: 1px dashed var(--vdx-color-border-subtle);
    }
    .vdx-empty__icon-container {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background-color: var(--vdx-color-bg-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--vdx-space-4);
      color: var(--vdx-color-text-tertiary);
    }
    .vdx-empty__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--vdx-color-text-primary);
      margin: 0 0 var(--vdx-space-2) 0;
    }
    .vdx-empty__description {
      font-size: 0.875rem;
      color: var(--vdx-color-text-secondary);
      max-width: 400px;
      margin: 0 0 var(--vdx-space-6) 0;
      line-height: 1.5;
    }
    .vdx-empty__actions {
      display: flex;
      align-items: center;
      gap: var(--vdx-space-3);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxEmptyStateComponent {
  @Input({ required: true }) title!: string;
  @Input() description?: string;
  @Input() icon?: string = 'file-text';
}
