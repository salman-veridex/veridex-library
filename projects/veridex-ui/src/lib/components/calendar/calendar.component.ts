import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

@Component({
  selector: 'vx-calendar',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div class="vdx-calendar">
      <div class="vdx-calendar__header">
        <button type="button" class="vdx-calendar__nav" (click)="prevMonth()">
          <vx-icon name="chevron-left" size="sm"></vx-icon>
        </button>
        <span class="vdx-calendar__title">{{ monthYearTitle }}</span>
        <button type="button" class="vdx-calendar__nav" (click)="nextMonth()">
          <vx-icon name="chevron-right" size="sm"></vx-icon>
        </button>
      </div>

      <table class="vdx-calendar__grid">
        <thead>
          <tr>
            <th *ngFor="let day of weekDays">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let week of calendarWeeks">
            <td
              *ngFor="let day of week"
              [class.vdx-calendar__day--other]="day.otherMonth"
              [class.vdx-calendar__day--today]="day.isToday"
              [class.vdx-calendar__day--selected]="day.isSelected"
              class="vdx-calendar__day"
              (click)="selectDate(day.date)">
              {{ day.dayNum }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .vdx-calendar {
      width: 280px;
      background-color: var(--vdx-color-bg-surface);
      border: 1px solid var(--vdx-color-border-subtle);
      border-radius: var(--vdx-radius-lg);
      padding: var(--vdx-space-4);
      font-family: var(--vdx-type-family-primary);
    }
    .vdx-calendar__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--vdx-space-3);
    }
    .vdx-calendar__title { font-weight: 600; font-size: 14px; color: var(--vdx-color-text-primary); }
    .vdx-calendar__nav { border: none; background: none; cursor: pointer; color: var(--vdx-color-text-secondary); }
    .vdx-calendar__grid { width: 100%; border-collapse: collapse; text-align: center; }
    .vdx-calendar__grid th { font-size: 12px; color: var(--vdx-color-text-tertiary); padding-bottom: 8px; font-weight: 500; }
    .vdx-calendar__day {
      height: 32px;
      font-size: 13px;
      cursor: pointer;
      border-radius: 50%;
      color: var(--vdx-color-text-primary);
    }
    .vdx-calendar__day:hover { background-color: var(--vdx-color-bg-subtle); }
    .vdx-calendar__day--other { color: var(--vdx-color-text-disabled); }
    .vdx-calendar__day--today { font-weight: 700; color: var(--vdx-color-action-primary); }
    .vdx-calendar__day--selected {
      background-color: var(--vdx-color-action-primary) !important;
      color: white !important;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxCalendarComponent {
  @Input() selectedDate: Date = new Date();
  @Output() selectedDateChange = new EventEmitter<Date>();

  currentMonth = signal<number>(new Date().getMonth());
  currentYear = signal<number>(new Date().getFullYear());

  readonly weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  get monthYearTitle(): string {
    const d = new Date(this.currentYear(), this.currentMonth(), 1);
    return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  get calendarWeeks(): any[][] {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks: any[][] = [];
    let currentWeek: any[] = [];

    // Prev month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      currentWeek.push({ dayNum: prevMonthDays - i, otherMonth: true, date: new Date(year, month - 1, prevMonthDays - i) });
    }

    // Current month days
    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = date.toDateString() === this.selectedDate.toDateString();
      currentWeek.push({ dayNum: d, otherMonth: false, isToday, isSelected, date });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Next month padding
    let nextD = 1;
    while (currentWeek.length > 0 && currentWeek.length < 7) {
      currentWeek.push({ dayNum: nextD, otherMonth: true, date: new Date(year, month + 1, nextD) });
      nextD++;
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);

    return weeks;
  }

  prevMonth(): void {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update(y => y - 1);
    } else {
      this.currentMonth.update(m => m - 1);
    }
  }

  nextMonth(): void {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update(y => y + 1);
    } else {
      this.currentMonth.update(m => m + 1);
    }
  }

  selectDate(d: Date): void {
    this.selectedDate = d;
    this.selectedDateChange.emit(d);
  }
}
