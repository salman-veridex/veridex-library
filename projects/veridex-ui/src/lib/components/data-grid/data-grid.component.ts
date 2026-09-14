import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';
import { VxCheckboxComponent } from '../forms/forms.component';
import { VxSpinnerComponent } from '../loading/loading.component';

export interface VxColumnDef {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export type VxTableDensity = 'compact' | 'comfortable' | 'spacious';

@Component({
  selector: 'vx-table',
  standalone: true,
  imports: [CommonModule, VxIconComponent, VxCheckboxComponent, VxSpinnerComponent],
  template: `
    <div class="vdx-table-container">
      <table [class]="tableClasses">
        <thead>
          <tr>
            <th *ngIf="selectable" class="vdx-th vdx-th--checkbox">
              <vx-checkbox
                [checked]="isAllSelected()"
                (checkedChange)="toggleSelectAll($event)">
              </vx-checkbox>
            </th>
            <th
              *ngFor="let col of columns"
              [class]="'vdx-th vdx-th--' + (col.align || 'left')"
              [style.width]="col.width"
              [attr.aria-sort]="getSortState(col.key)"
              (click)="col.sortable ? sort(col.key) : null">
              <div class="vdx-th__content" [class.vdx-th__content--sortable]="col.sortable">
                <span>{{ col.header }}</span>
                <vx-icon
                  *ngIf="col.sortable"
                  [name]="getSortIcon(col.key)"
                  size="xs"
                  class="vdx-sort-icon"
                  [class.vdx-sort-icon--active]="sortKey() === col.key">
                </vx-icon>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loading State -->
          <tr *ngIf="loading">
            <td [attr.colspan]="totalColSpan" class="vdx-td--state">
              <vx-spinner size="md"></vx-spinner>
              <span>Loading data...</span>
            </td>
          </tr>

          <!-- Empty State -->
          <tr *ngIf="!loading && displayedData().length === 0">
            <td [attr.colspan]="totalColSpan" class="vdx-td--state">
              <vx-icon name="file-text" size="xl" class="vdx-empty-icon"></vx-icon>
              <p class="vdx-empty-title">{{ emptyMessage }}</p>
            </td>
          </tr>

          <!-- Data Rows -->
          <ng-container *ngIf="!loading">
            <tr
              *ngFor="let row of displayedData(); let i = index"
              [class.vdx-tr--selected]="isSelected(row)"
              (click)="onRowClick(row)">
              
              <td *ngIf="selectable" class="vdx-td vdx-td--checkbox" (click)="$event.stopPropagation()">
                <vx-checkbox
                  [checked]="isSelected(row)"
                  (checkedChange)="toggleSelectRow(row, $event)">
                </vx-checkbox>
              </td>

              <td
                *ngFor="let col of columns"
                [class]="'vdx-td vdx-td--' + (col.align || 'left')">
                {{ row[col.key] }}
              </td>
            </tr>
          </ng-container>
        </tbody>
      </table>

      <!-- Pagination Footer -->
      <div *ngIf="pagination && !loading && data.length > 0" class="vdx-paginator">
        <span class="vdx-paginator__info">
          Showing {{ pageStart }} to {{ pageEnd }} of {{ data.length }} entries
        </span>
        
        <div class="vdx-paginator__controls">
          <button
            type="button"
            class="vdx-paginator__btn"
            [disabled]="currentPage() === 1"
            (click)="goToPage(currentPage() - 1)">
            <vx-icon name="chevron-left" size="sm"></vx-icon>
            Previous
          </button>

          <span class="vdx-paginator__page-num">Page {{ currentPage() }} of {{ totalPages }}</span>

          <button
            type="button"
            class="vdx-paginator__btn"
            [disabled]="currentPage() === totalPages"
            (click)="goToPage(currentPage() + 1)">
            Next
            <vx-icon name="chevron-right" size="sm"></vx-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vdx-table-container {
      width: 100%;
      overflow-x: auto;
      background-color: var(--vdx-color-bg-surface);
      border: 1px solid var(--vdx-color-border-subtle);
      border-radius: var(--vdx-radius-lg);
    }
    .vdx-table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
      text-align: left;
    }

    .vdx-th {
      background-color: var(--vdx-color-table-header-bg);
      color: var(--vdx-color-table-header-text);
      font-weight: 600;
      padding: var(--vdx-space-3) var(--vdx-space-4);
      border-bottom: 1px solid var(--vdx-color-table-border);
      user-select: none;
    }
    .vdx-th__content { display: flex; align-items: center; gap: var(--vdx-space-2); }
    .vdx-th__content--sortable { cursor: pointer; }
    .vdx-sort-icon { opacity: 0.4; transition: opacity 0.2s; }
    .vdx-sort-icon--active { opacity: 1; color: var(--vdx-color-action-primary); }

    .vdx-td {
      padding: var(--vdx-space-3) var(--vdx-space-4);
      border-bottom: 1px solid var(--vdx-color-table-border);
      color: var(--vdx-color-text-primary);
    }
    .vdx-table--compact .vdx-td { padding: var(--vdx-space-2) var(--vdx-space-3); font-size: 13px; }
    .vdx-table--spacious .vdx-td { padding: var(--vdx-space-4) var(--vdx-space-5); }

    .vdx-table tr:hover { background-color: var(--vdx-color-table-row-hover); }
    .vdx-tr--selected { background-color: var(--vdx-color-table-row-selected) !important; }

    .vdx-td--state {
      text-align: center;
      padding: var(--vdx-space-8) !important;
      color: var(--vdx-color-text-secondary);
    }
    .vdx-empty-icon { color: var(--vdx-color-text-tertiary); margin-bottom: var(--vdx-space-2); }

    .vdx-paginator {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--vdx-space-3) var(--vdx-space-4);
      border-top: 1px solid var(--vdx-color-table-border);
      font-size: 13px;
      color: var(--vdx-color-text-secondary);
    }
    .vdx-paginator__controls { display: flex; align-items: center; gap: var(--vdx-space-3); }
    .vdx-paginator__btn {
      display: inline-flex;
      align-items: center;
      gap: var(--vdx-space-1);
      padding: 4px 10px;
      border: 1px solid var(--vdx-color-border-subtle);
      border-radius: var(--vdx-radius-md);
      background: none;
      font-size: 13px;
      cursor: pointer;
    }
    .vdx-paginator__btn:disabled { opacity: 0.5; cursor: not-allowed; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxTableComponent {
  @Input() data: any[] = [];
  @Input() columns: VxColumnDef[] = [];
  @Input() density: VxTableDensity = 'comfortable';
  @Input() selectable: boolean = false;
  @Input() loading: boolean = false;
  @Input() pagination: boolean = false;
  @Input() pageSize: number = 10;
  @Input() emptyMessage: string = 'No data available in table';

  @Output() rowClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();

  sortKey = signal<string | null>(null);
  sortOrder = signal<'asc' | 'desc'>('asc');
  currentPage = signal<number>(1);
  selectedRows = signal<Set<any>>(new Set());

  get tableClasses(): string {
    return `vdx-table vdx-table--${this.density}`;
  }

  get totalColSpan(): number {
    return this.columns.length + (this.selectable ? 1 : 0);
  }

  displayedData = computed(() => {
    let result = [...this.data];

    // Sorting
    const key = this.sortKey();
    if (key) {
      const order = this.sortOrder() === 'asc' ? 1 : -1;
      result.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];
        if (valA < valB) return -1 * order;
        if (valA > valB) return 1 * order;
        return 0;
      });
    }

    // Pagination
    if (this.pagination) {
      const start = (this.currentPage() - 1) * this.pageSize;
      return result.slice(start, start + this.pageSize);
    }

    return result;
  });

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize) || 1;
  }
  get pageStart(): number {
    return (this.currentPage() - 1) * this.pageSize + 1;
  }
  get pageEnd(): number {
    return Math.min(this.currentPage() * this.pageSize, this.data.length);
  }

  sort(key: string): void {
    if (this.sortKey() === key) {
      if (this.sortOrder() === 'asc') {
        this.sortOrder.set('desc');
      } else {
        this.sortKey.set(null);
      }
    } else {
      this.sortKey.set(key);
      this.sortOrder.set('asc');
    }
  }

  getSortState(key: string): 'ascending' | 'descending' | 'none' {
    if (this.sortKey() !== key) return 'none';
    return this.sortOrder() === 'asc' ? 'ascending' : 'descending';
  }

  getSortIcon(key: string): string {
    if (this.sortKey() !== key) return 'chevron-down';
    return this.sortOrder() === 'asc' ? 'arrow-up' : 'arrow-down';
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
    }
  }

  isSelected(row: any): boolean {
    return this.selectedRows().has(row);
  }

  isAllSelected(): boolean {
    if (this.data.length === 0) return false;
    return this.data.every(r => this.selectedRows().has(r));
  }

  toggleSelectAll(checked: boolean): void {
    const set = new Set(this.selectedRows());
    if (checked) {
      this.data.forEach(r => set.add(r));
    } else {
      set.clear();
    }
    this.selectedRows.set(set);
    this.selectionChange.emit(Array.from(set));
  }

  toggleSelectRow(row: any, checked: boolean): void {
    const set = new Set(this.selectedRows());
    if (checked) set.add(row); else set.delete(row);
    this.selectedRows.set(set);
    this.selectionChange.emit(Array.from(set));
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }
}
