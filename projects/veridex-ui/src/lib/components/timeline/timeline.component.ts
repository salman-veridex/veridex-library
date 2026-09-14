import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

export interface VxTimelineItem {
  id: string;
  title: string;
  timestamp: string;
  description?: string;
  icon?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

@Component({
  selector: 'vx-timeline',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div class="vdx-timeline">
      <div
        *ngFor="let item of items; let last = last"
        class="vdx-timeline__item">
        
        <div [class]="'vdx-timeline__dot vdx-timeline__dot--' + (item.variant || 'info')">
          <vx-icon [name]="item.icon || 'circle'" size="xs"></vx-icon>
        </div>

        <div *ngIf="!last" class="vdx-timeline__line"></div>

        <div class="vdx-timeline__content">
          <div class="vdx-timeline__header">
            <span class="vdx-timeline__title">{{ item.title }}</span>
            <span class="vdx-timeline__time">{{ item.timestamp }}</span>
          </div>
          <p *ngIf="item.description" class="vdx-timeline__desc">{{ item.description }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vdx-timeline { display: flex; flex-direction: column; }
    .vdx-timeline__item {
      position: relative;
      display: flex;
      gap: var(--vdx-space-4);
      padding-bottom: var(--vdx-space-6);
    }
    .vdx-timeline__dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--vdx-color-bg-surface);
      border: 2px solid var(--vdx-color-border-default);
      color: var(--vdx-color-text-secondary);
      z-index: 1;
      flex-shrink: 0;
    }
    .vdx-timeline__dot--success { border-color: var(--vdx-primitive-green-600); color: var(--vdx-primitive-green-600); }
    .vdx-timeline__dot--warning { border-color: var(--vdx-primitive-amber-600); color: var(--vdx-primitive-amber-600); }
    .vdx-timeline__dot--error { border-color: var(--vdx-primitive-red-600); color: var(--vdx-primitive-red-600); }
    .vdx-timeline__dot--info { border-color: var(--vdx-color-action-primary); color: var(--vdx-color-action-primary); }

    .vdx-timeline__line {
      position: absolute;
      top: 24px;
      left: 11px;
      bottom: 0;
      width: 2px;
      background-color: var(--vdx-color-border-subtle);
    }
    .vdx-timeline__content { flex: 1; font-family: var(--vdx-type-family-primary); }
    .vdx-timeline__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .vdx-timeline__title { font-size: 14px; font-weight: 600; color: var(--vdx-color-text-primary); }
    .vdx-timeline__time { font-size: 12px; color: var(--vdx-color-text-tertiary); }
    .vdx-timeline__desc { font-size: 13px; color: var(--vdx-color-text-secondary); margin: 4px 0 0 0; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxTimelineComponent {
  @Input({ required: true }) items: VxTimelineItem[] = [];
}
