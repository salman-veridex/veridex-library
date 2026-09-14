import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

export type VxStepState = 'upcoming' | 'active' | 'completed' | 'error';

export interface VxStep {
  id: string;
  label: string;
  description?: string;
  state?: VxStepState;
}

@Component({
  selector: 'vx-stepper',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <nav class="vdx-stepper" aria-label="Progress">
      <ol class="vdx-stepper__list">
        <li
          *ngFor="let step of steps; let i = index; let last = last"
          class="vdx-stepper__item"
          [class.vdx-stepper__item--active]="i === currentStep"
          [class.vdx-stepper__item--completed]="i < currentStep || step.state === 'completed'"
          [class.vdx-stepper__item--error]="step.state === 'error'">
          
          <div class="vdx-stepper__header" (click)="onStepClick(i)">
            <span class="vdx-stepper__badge">
              <vx-icon *ngIf="i < currentStep || step.state === 'completed'" name="check" size="xs"></vx-icon>
              <vx-icon *ngIf="step.state === 'error'" name="alert-circle" size="xs"></vx-icon>
              <span *ngIf="i >= currentStep && step.state !== 'completed' && step.state !== 'error'">
                {{ i + 1 }}
              </span>
            </span>

            <div class="vdx-stepper__label-container">
              <span class="vdx-stepper__title">{{ step.label }}</span>
              <span *ngIf="step.description" class="vdx-stepper__desc">{{ step.description }}</span>
            </div>
          </div>

          <div *ngIf="!last" class="vdx-stepper__line"></div>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .vdx-stepper { width: 100%; }
    .vdx-stepper__list {
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .vdx-stepper__item {
      display: flex;
      align-items: center;
      flex: 1;
      position: relative;
    }
    .vdx-stepper__header {
      display: flex;
      align-items: center;
      gap: var(--vdx-space-2.5);
      cursor: pointer;
    }
    .vdx-stepper__badge {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid var(--vdx-primitive-neutral-400);
      background-color: var(--vdx-color-bg-surface);
      color: var(--vdx-color-text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
    }
    .vdx-stepper__item--active .vdx-stepper__badge {
      border-color: var(--vdx-color-action-primary);
      background-color: var(--vdx-color-action-primary);
      color: white;
    }
    .vdx-stepper__item--completed .vdx-stepper__badge {
      border-color: var(--vdx-primitive-green-600);
      background-color: var(--vdx-primitive-green-600);
      color: white;
    }
    .vdx-stepper__item--error .vdx-stepper__badge {
      border-color: var(--vdx-primitive-red-600);
      background-color: var(--vdx-primitive-red-600);
      color: white;
    }
    .vdx-stepper__title {
      font-size: 14px;
      font-weight: 600;
      color: var(--vdx-color-text-primary);
    }
    .vdx-stepper__desc {
      font-size: 12px;
      color: var(--vdx-color-text-secondary);
      display: block;
    }
    .vdx-stepper__line {
      flex: 1;
      height: 2px;
      background-color: var(--vdx-color-border-subtle);
      margin: 0 var(--vdx-space-4);
    }
    .vdx-stepper__item--completed .vdx-stepper__line {
      background-color: var(--vdx-primitive-green-600);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxStepperComponent {
  @Input({ required: true }) steps: VxStep[] = [];
  @Input() currentStep: number = 0;
  @Output() stepClick = new EventEmitter<number>();

  onStepClick(index: number): void {
    this.stepClick.emit(index);
  }
}
