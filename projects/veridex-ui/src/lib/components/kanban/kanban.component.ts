import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface VxKanbanCard {
  id: string;
  title: string;
  subtitle?: string;
  tags?: string[];
}

export interface VxKanbanColumn {
  id: string;
  title: string;
  cards: VxKanbanCard[];
}

@Component({
  selector: 'vx-kanban-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-kanban">
      <div *ngFor="let col of columns" class="vdx-kanban__column">
        <div class="vdx-kanban__column-header">
          <h4 class="vdx-kanban__column-title">{{ col.title }}</h4>
          <span class="vdx-kanban__count">{{ col.cards.length }}</span>
        </div>

        <div class="vdx-kanban__cards">
          <div *ngFor="let card of col.cards" class="vdx-kanban__card">
            <h5 class="vdx-kanban__card-title">{{ card.title }}</h5>
            <p *ngIf="card.subtitle" class="vdx-kanban__card-sub">{{ card.subtitle }}</p>
            
            <div *ngIf="card.tags && card.tags.length > 0" class="vdx-kanban__tags">
              <span *ngFor="let tag of card.tags" class="vdx-kanban__tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vdx-kanban {
      display: flex;
      gap: var(--vdx-space-4);
      overflow-x: auto;
      padding-bottom: var(--vdx-space-4);
    }
    .vdx-kanban__column {
      flex: 1;
      min-width: 280px;
      background-color: var(--vdx-color-bg-canvas);
      border: 1px solid var(--vdx-color-border-subtle);
      border-radius: var(--vdx-radius-lg);
      padding: var(--vdx-space-4);
      display: flex;
      flex-direction: column;
    }
    .vdx-kanban__column-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--vdx-space-4);
    }
    .vdx-kanban__column-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--vdx-color-text-primary);
      margin: 0;
    }
    .vdx-kanban__count {
      font-size: 12px;
      font-weight: 600;
      background-color: var(--vdx-color-bg-muted);
      padding: 2px 8px;
      border-radius: var(--vdx-radius-full);
      color: var(--vdx-color-text-secondary);
    }
    .vdx-kanban__cards {
      display: flex;
      flex-direction: column;
      gap: var(--vdx-space-3);
    }
    .vdx-kanban__card {
      background-color: var(--vdx-color-bg-surface);
      border: 1px solid var(--vdx-color-border-subtle);
      border-radius: var(--vdx-radius-md);
      padding: var(--vdx-space-3);
      box-shadow: var(--vdx-shadow-xs);
    }
    .vdx-kanban__card-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--vdx-color-text-primary);
      margin: 0 0 4px 0;
    }
    .vdx-kanban__card-sub {
      font-size: 12px;
      color: var(--vdx-color-text-secondary);
      margin: 0 0 var(--vdx-space-2) 0;
    }
    .vdx-kanban__tags { display: flex; gap: 4px; flex-wrap: wrap; }
    .vdx-kanban__tag {
      font-size: 11px;
      background-color: var(--vdx-color-bg-muted);
      padding: 1px 6px;
      border-radius: var(--vdx-radius-sm);
      color: var(--vdx-color-text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxKanbanBoardComponent {
  @Input({ required: true }) columns: VxKanbanColumn[] = [];
}
