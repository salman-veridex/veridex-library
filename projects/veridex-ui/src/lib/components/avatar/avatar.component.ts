import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type VxAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type VxAvatarStatus = 'online' | 'offline' | 'busy' | 'away';

@Component({
  selector: 'vx-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'vdx-avatar vdx-avatar--' + size">
      <img
        *ngIf="src && !imageError"
        [src]="src"
        [alt]="name || 'User avatar'"
        (error)="onImageError()"
        class="vdx-avatar__img" />
      
      <span *ngIf="!src || imageError" class="vdx-avatar__initials">
        {{ getInitials(name) }}
      </span>

      <span
        *ngIf="status"
        [class]="'vdx-avatar-status vdx-avatar-status--' + status"
        [attr.aria-label]="status">
      </span>
    </div>
  `,
  styles: [`
    :host { display: inline-block; position: relative; }
    .vdx-avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: var(--vdx-primitive-navy-800);
      color: var(--vdx-primitive-neutral-000);
      font-weight: 600;
      font-family: var(--vdx-type-family-primary);
      overflow: hidden;
      user-select: none;
    }

    .vdx-avatar--xs { width: 24px; height: 24px; font-size: 10px; }
    .vdx-avatar--sm { width: 32px; height: 32px; font-size: 12px; }
    .vdx-avatar--md { width: 40px; height: 40px; font-size: 14px; }
    .vdx-avatar--lg { width: 48px; height: 48px; font-size: 16px; }
    .vdx-avatar--xl { width: 64px; height: 64px; font-size: 20px; }

    .vdx-avatar__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .vdx-avatar-status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      min-width: 8px;
      min-height: 8px;
      border-radius: 50%;
      border: 2px solid var(--vdx-color-bg-surface);
    }
    .vdx-avatar-status--online { background-color: var(--vdx-primitive-green-500); }
    .vdx-avatar-status--offline { background-color: var(--vdx-primitive-neutral-400); }
    .vdx-avatar-status--busy { background-color: var(--vdx-primitive-red-600); }
    .vdx-avatar-status--away { background-color: var(--vdx-primitive-amber-500); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxAvatarComponent {
  @Input() src?: string;
  @Input() name?: string = '';
  @Input() size: VxAvatarSize = 'md';
  @Input() status?: VxAvatarStatus;

  imageError = false;

  onImageError(): void {
    this.imageError = true;
  }

  getInitials(name?: string): string {
    if (!name) return 'VD';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
}

@Component({
  selector: 'vx-avatar-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-avatar-group">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .vdx-avatar-group {
      display: inline-flex;
      align-items: center;
    }
    ::ng-deep .vdx-avatar-group > vx-avatar:not(:first-child) {
      margin-left: -8px;
    }
    ::ng-deep .vdx-avatar-group > vx-avatar .vdx-avatar {
      border: 2px solid var(--vdx-color-bg-surface);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxAvatarGroupComponent {}
