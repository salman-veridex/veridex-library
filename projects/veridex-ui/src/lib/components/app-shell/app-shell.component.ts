import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';

@Component({
  selector: 'vx-app-shell',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div class="vdx-app-shell" [attr.data-collapsed]="sidebarCollapsed()">
      <!-- Skip Navigation Link for Accessibility -->
      <a href="#main-content" class="vdx-skip-link">Skip to main content</a>

      <!-- Top Bar Slot -->
      <header class="vdx-topbar">
        <button
          type="button"
          class="vdx-topbar__hamburger"
          aria-label="Toggle navigation drawer"
          (click)="toggleMobileDrawer()">
          <vx-icon name="menu" size="lg"></vx-icon>
        </button>

        <ng-content select="vx-top-bar"></ng-content>
      </header>

      <div class="vdx-app-shell__body">
        <!-- Sidebar Navigation -->
        <aside
          class="vdx-sidebar"
          [class.vdx-sidebar--collapsed]="sidebarCollapsed()"
          [class.vdx-sidebar--mobile-open]="mobileDrawerOpen()"
          role="navigation"
          aria-label="Main navigation">
          
          <ng-content select="vx-sidebar"></ng-content>

          <!-- Sidebar Collapse Toggle Button -->
          <button
            type="button"
            class="vdx-sidebar__toggle"
            [attr.aria-label]="sidebarCollapsed() ? 'Expand navigation' : 'Collapse navigation'"
            (click)="toggleSidebar()">
            <vx-icon [name]="sidebarCollapsed() ? 'chevron-right' : 'chevron-left'" size="md"></vx-icon>
            <span *ngIf="!sidebarCollapsed()" class="vdx-sidebar__toggle-text">Collapse sidebar</span>
          </button>
        </aside>

        <!-- Mobile Drawer Backdrop -->
        <div
          *ngIf="mobileDrawerOpen()"
          class="vdx-drawer-backdrop"
          (click)="closeMobileDrawer()">
        </div>

        <!-- Main Content Area -->
        <main id="main-content" class="vdx-main-content" tabindex="-1">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; width: 100vw; overflow: hidden; }

    .vdx-app-shell {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: var(--vdx-color-bg-canvas);
    }

    .vdx-skip-link {
      position: absolute;
      top: -100%;
      left: var(--vdx-space-4);
      z-index: 1000;
      padding: var(--vdx-space-2) var(--vdx-space-4);
      background: var(--vdx-color-action-primary);
      color: var(--vdx-color-action-primary-text);
      border-radius: var(--vdx-radius-md);
      text-decoration: none;
      font-weight: 600;
    }
    .vdx-skip-link:focus { top: var(--vdx-space-2); }

    .vdx-topbar {
      height: 56px;
      background-color: var(--vdx-color-topbar-bg);
      border-bottom: 1px solid var(--vdx-color-topbar-border);
      display: flex;
      align-items: center;
      padding: 0 var(--vdx-space-4);
      z-index: var(--vdx-z-sticky);
    }

    .vdx-topbar__hamburger {
      display: none;
      background: none;
      border: none;
      color: var(--vdx-color-text-primary);
      cursor: pointer;
      padding: var(--vdx-space-2);
      margin-right: var(--vdx-space-2);
    }

    .vdx-app-shell__body {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }

    .vdx-sidebar {
      width: var(--vdx-sidebar-width-expanded, 240px);
      background-color: var(--vdx-sidebar-bg, #1b2635);
      color: var(--vdx-sidebar-text, #dce3ec);
      display: flex;
      flex-direction: column;
      transition: width var(--vdx-duration-normal) var(--vdx-ease-default);
      z-index: var(--vdx-z-sidebar);
    }

    .vdx-sidebar--collapsed {
      width: var(--vdx-sidebar-width-collapsed, 56px);
    }

    .vdx-sidebar__toggle {
      margin-top: auto;
      height: 48px;
      background: none;
      border: none;
      border-top: 1px solid var(--vdx-color-nav-border);
      color: var(--vdx-sidebar-text);
      display: flex;
      align-items: center;
      padding: 0 var(--vdx-space-4);
      gap: var(--vdx-space-3);
      cursor: pointer;
      width: 100%;
      white-space: nowrap;
    }
    .vdx-sidebar__toggle:hover {
      background-color: var(--vdx-color-nav-item-hover-bg);
    }
    .vdx-sidebar__toggle-text {
      font-size: 13px;
      font-weight: 500;
    }

    .vdx-main-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--vdx-space-6);
      box-sizing: border-box;
    }

    .vdx-drawer-backdrop {
      position: absolute;
      inset: 0;
      background-color: var(--vdx-color-bg-overlay);
      z-index: calc(var(--vdx-z-sidebar) - 1);
    }

    @media (max-width: 767px) {
      .vdx-topbar__hamburger { display: inline-flex; }
      .vdx-sidebar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -240px;
        width: 240px !important;
        transition: transform 0.3s ease;
      }
      .vdx-sidebar--mobile-open {
        transform: translateX(240px);
      }
      .vdx-sidebar__toggle { display: none; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxAppShellComponent {
  sidebarCollapsed = signal(false);
  mobileDrawerOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update(val => !val);
  }

  toggleMobileDrawer(): void {
    this.mobileDrawerOpen.update(val => !val);
  }

  closeMobileDrawer(): void {
    this.mobileDrawerOpen.set(false);
  }
}

@Component({
  selector: 'vx-top-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-topbar-content">
      <div class="vdx-topbar__brand">
        <span class="vdx-logo-text">
          <span class="vdx-logo-accent">V</span>eriDex
        </span>
        <span *ngIf="portalName" class="vdx-topbar__portal-name">{{ portalName }}</span>
      </div>

      <div class="vdx-topbar__center">
        <ng-content select="[center]"></ng-content>
      </div>

      <div class="vdx-topbar__actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host { width: 100%; }
    .vdx-topbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .vdx-topbar__brand {
      display: flex;
      align-items: center;
      gap: var(--vdx-space-3);
    }
    .vdx-logo-text {
      font-family: var(--vdx-type-family-primary);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--vdx-color-text-primary);
      letter-spacing: -0.02em;
    }
    .vdx-logo-accent { color: var(--vdx-color-action-primary); }
    .vdx-topbar__portal-name {
      font-size: 0.875rem;
      color: var(--vdx-color-text-secondary);
      border-left: 1px solid var(--vdx-color-border-subtle);
      padding-left: var(--vdx-space-3);
    }
    .vdx-topbar__actions {
      display: flex;
      align-items: center;
      gap: var(--vdx-space-3);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxTopBarComponent {
  @Input() portalName?: string;
}

@Component({
  selector: 'vx-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-sidebar-nav">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .vdx-sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: var(--vdx-space-1);
      padding: var(--vdx-space-3);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxSidebarComponent {}

@Component({
  selector: 'vx-sidebar-item',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <a
      [href]="href || '#'"
      [class.vdx-nav-item--active]="active"
      class="vdx-nav-item"
      [attr.aria-current]="active ? 'page' : null">
      <vx-icon *ngIf="icon" [name]="icon" size="md" class="vdx-nav-item__icon"></vx-icon>
      <span class="vdx-nav-item__label">{{ label }}</span>
    </a>
  `,
  styles: [`
    .vdx-nav-item {
      display: flex;
      align-items: center;
      gap: var(--vdx-space-3);
      padding: var(--vdx-space-2-5) var(--vdx-space-3);
      border-radius: var(--vdx-radius-md);
      color: var(--vdx-sidebar-text, #dce3ec);
      text-decoration: none;
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
      font-weight: 500;
      transition: background-color var(--vdx-duration-fast);
      white-space: nowrap;
      overflow: hidden;
    }
    .vdx-nav-item:hover {
      background-color: var(--vdx-color-nav-item-hover-bg, #243144);
    }
    .vdx-nav-item--active {
      background-color: var(--vdx-color-nav-item-active-bg, #f86407) !important;
      color: var(--vdx-color-text-inverse) !important;
      font-weight: 600;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxSidebarItemComponent {
  @Input({ required: true }) label!: string;
  @Input() icon?: string;
  @Input() active: boolean = false;
  @Input() href?: string;
}

@Component({
  selector: 'vx-stack',
  standalone: true,
  imports: [CommonModule],
  template: `<div [class]="stackClasses"><ng-content></ng-content></div>`,
  styles: [`
    .vdx-stack { display: flex; flex-direction: column; }
    .vdx-gap-1 { gap: var(--vdx-space-1); }
    .vdx-gap-2 { gap: var(--vdx-space-2); }
    .vdx-gap-3 { gap: var(--vdx-space-3); }
    .vdx-gap-4 { gap: var(--vdx-space-4); }
    .vdx-gap-6 { gap: var(--vdx-space-6); }
    .vdx-gap-8 { gap: var(--vdx-space-8); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxStackComponent {
  @Input() gap: '1' | '2' | '3' | '4' | '6' | '8' = '4';
  get stackClasses(): string { return `vdx-stack vdx-gap-${this.gap}`; }
}

@Component({
  selector: 'vx-inline',
  standalone: true,
  imports: [CommonModule],
  template: `<div [class]="inlineClasses"><ng-content></ng-content></div>`,
  styles: [`
    .vdx-inline { display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; }
    .vdx-gap-1 { gap: var(--vdx-space-1); }
    .vdx-gap-2 { gap: var(--vdx-space-2); }
    .vdx-gap-3 { gap: var(--vdx-space-3); }
    .vdx-gap-4 { gap: var(--vdx-space-4); }
    .vdx-gap-6 { gap: var(--vdx-space-6); }
    .vdx-gap-8 { gap: var(--vdx-space-8); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxInlineComponent {
  @Input() gap: '1' | '2' | '3' | '4' | '6' | '8' = '4';
  get inlineClasses(): string { return `vdx-inline vdx-gap-${this.gap}`; }
}

@Component({
  selector: 'vx-grid',
  standalone: true,
  imports: [CommonModule],
  template: `<div [class]="'vdx-grid vdx-grid-cols-' + cols"><ng-content></ng-content></div>`,
  styles: [`
    .vdx-grid { display: grid; gap: var(--vdx-space-4); }
    .vdx-grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
    .vdx-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
    .vdx-grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    .vdx-grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
    @media (max-width: 767px) {
      .vdx-grid { grid-template-columns: 1fr !important; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxGridComponent {
  @Input() cols: number = 3;
}
