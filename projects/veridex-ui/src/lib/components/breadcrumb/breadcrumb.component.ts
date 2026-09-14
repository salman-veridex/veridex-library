import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface VxBreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'vx-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="vdx-breadcrumb" aria-label="Breadcrumb">
      <ol class="vdx-breadcrumb__list">
        <li
          *ngFor="let item of items; let last = last"
          class="vdx-breadcrumb__item">
          
          <a
            *ngIf="!last && item.url"
            [href]="item.url"
            class="vdx-breadcrumb__link">
            {{ item.label }}
          </a>

          <span *ngIf="last || !item.url" class="vdx-breadcrumb__current" aria-current="page">
            {{ item.label }}
          </span>

          <span *ngIf="!last" class="vdx-breadcrumb__separator" aria-hidden="true">/</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .vdx-breadcrumb { display: block; }
    .vdx-breadcrumb__list {
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
    }
    .vdx-breadcrumb__item { display: flex; align-items: center; }
    .vdx-breadcrumb__link {
      color: var(--vdx-color-text-link);
      text-decoration: none;
      font-weight: 500;
    }
    .vdx-breadcrumb__link:hover {
      color: var(--vdx-color-text-link-hover);
      text-decoration: underline;
    }
    .vdx-breadcrumb__current {
      color: var(--vdx-color-text-primary);
      font-weight: 600;
    }
    .vdx-breadcrumb__separator {
      margin: 0 var(--vdx-space-2);
      color: var(--vdx-color-text-tertiary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxBreadcrumbComponent {
  @Input({ required: true }) items: VxBreadcrumbItem[] = [];
}
