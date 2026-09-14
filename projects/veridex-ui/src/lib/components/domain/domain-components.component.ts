import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VxIconComponent } from '../icon/icon.component';
import { VxBadgeComponent } from '../badge/badge.component';
import { VxButtonComponent } from '../button/button.component';
import { VxCardComponent } from '../card/card.component';
import { VxTableComponent, VxColumnDef } from '../data-grid/data-grid.component';
import { VxCheckboxComponent } from '../forms/forms.component';

export type VxPolicyStatus = 'draft' | 'quoted' | 'bound' | 'active' | 'renewal' | 'cancelled' | 'expired' | 'lapsed';

@Component({
  selector: 'vx-policy-status-chip',
  standalone: true,
  imports: [CommonModule, VxIconComponent, VxBadgeComponent],
  template: `
    <vx-badge [variant]="config.variant" [dot]="true">
      <vx-icon [name]="config.icon" size="xs"></vx-icon>
      <span>{{ config.label }}</span>
    </vx-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxPolicyStatusChipComponent {
  @Input({ required: true }) status!: VxPolicyStatus;

  get config(): { label: string; variant: any; icon: string } {
    switch (this.status) {
      case 'draft': return { label: 'Draft', variant: 'info', icon: 'file' };
      case 'quoted': return { label: 'Quoted', variant: 'info', icon: 'clipboard-list' };
      case 'bound': return { label: 'Bound', variant: 'success', icon: 'shield-check' };
      case 'active': return { label: 'Active', variant: 'success', icon: 'check-circle' };
      case 'renewal': return { label: 'Renewal Pending', variant: 'warning', icon: 'refresh-cw' };
      case 'cancelled': return { label: 'Cancelled', variant: 'error', icon: 'x-circle' };
      case 'expired': return { label: 'Expired', variant: 'neutral', icon: 'clock' };
      case 'lapsed': return { label: 'Lapsed', variant: 'error', icon: 'alert-circle' };
      default: return { label: this.status, variant: 'neutral', icon: 'info' };
    }
  }
}

@Component({
  selector: 'vx-kpi-card',
  standalone: true,
  imports: [CommonModule, VxIconComponent, VxCardComponent],
  template: `
    <vx-card variant="default" customClass="vdx-kpi-card">
      <div class="vdx-kpi__header">
        <span class="vdx-kpi__label">{{ label }}</span>
        <vx-icon *ngIf="icon" [name]="icon" size="md" class="vdx-kpi__icon"></vx-icon>
      </div>

      <div class="vdx-kpi__value">{{ value }}</div>

      <div *ngIf="trend" class="vdx-kpi__footer">
        <span [class]="'vdx-kpi__trend vdx-kpi__trend--' + trend">
          <vx-icon [name]="trend === 'up' ? 'trending-up' : (trend === 'down' ? 'trending-down' : 'minus')" size="xs"></vx-icon>
          {{ trendValue }}
        </span>
        <span *ngIf="trendPeriod" class="vdx-kpi__period">{{ trendPeriod }}</span>
      </div>
    </vx-card>
  `,
  styles: [`
    .vdx-kpi__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .vdx-kpi__label { font-size: 13px; font-weight: 500; color: var(--vdx-color-text-secondary); }
    .vdx-kpi__icon { color: var(--vdx-color-text-tertiary); }
    .vdx-kpi__value { font-size: 1.75rem; font-weight: 700; color: var(--vdx-color-text-primary); margin-bottom: 8px; }
    .vdx-kpi__footer { display: flex; align-items: center; gap: 6px; font-size: 12px; }
    .vdx-kpi__trend { display: inline-flex; align-items: center; gap: 2px; font-weight: 600; }
    .vdx-kpi__trend--up { color: var(--vdx-primitive-green-600); }
    .vdx-kpi__trend--down { color: var(--vdx-primitive-red-600); }
    .vdx-kpi__trend--neutral { color: var(--vdx-color-text-secondary); }
    .vdx-kpi__period { color: var(--vdx-color-text-tertiary); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxKpiCardComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
  @Input() icon?: string;
  @Input() trend?: 'up' | 'down' | 'neutral';
  @Input() trendValue?: string;
  @Input() trendPeriod?: string;
}

@Component({
  selector: 'vx-premium-card',
  standalone: true,
  imports: [CommonModule, VxCardComponent, VxButtonComponent],
  template: `
    <vx-card variant="comfortable" customClass="vdx-premium-card">
      <div class="vdx-premium__header">
        <span class="vdx-premium__tag">INVOICE</span>
        <span class="vdx-premium__due">Due {{ dueDate }}</span>
      </div>

      <div class="vdx-premium__amount">{{ amount }}</div>
      <div class="vdx-premium__policy">Policy Ref: {{ policyNo }}</div>

      <div class="vdx-premium__footer">
        <vx-button variant="primary" size="sm">Pay Premium</vx-button>
        <vx-button variant="outline" size="sm">Download Statement</vx-button>
      </div>
    </vx-card>
  `,
  styles: [`
    .vdx-premium__header { display: flex; justify-content: space-between; margin-bottom: 12px; }
    .vdx-premium__tag { font-size: 11px; font-weight: 700; color: var(--vdx-color-action-primary); }
    .vdx-premium__due { font-size: 12px; color: var(--vdx-color-text-secondary); }
    .vdx-premium__amount { font-size: 2rem; font-weight: 700; color: var(--vdx-color-text-primary); margin-bottom: 4px; }
    .vdx-premium__policy { font-size: 13px; color: var(--vdx-color-text-secondary); margin-bottom: 16px; }
    .vdx-premium__footer { display: flex; gap: 8px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxPremiumCardComponent {
  @Input() amount: string = '$12,450.00';
  @Input() dueDate: string = 'Oct 15, 2026';
  @Input() policyNo: string = 'POL-2024-8841';
}

@Component({
  selector: 'vx-notification-feed',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div class="vdx-notification-feed">
      <div *ngFor="let item of notifications" class="vdx-notification-item" [class.vdx-notification-item--unread]="!item.read">
        <vx-icon [name]="getIcon(item.severity)" size="md" class="vdx-notification-item__icon"></vx-icon>
        <div class="vdx-notification-item__content">
          <h5 class="vdx-notification-item__title">{{ item.title }}</h5>
          <p *ngIf="item.body" class="vdx-notification-item__body">{{ item.body }}</p>
          <span class="vdx-notification-item__time">{{ item.timestamp }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vdx-notification-feed { display: flex; flex-direction: column; gap: 8px; }
    .vdx-notification-item {
      display: flex; gap: 12px; padding: 12px; border-radius: var(--vdx-radius-md);
      background-color: var(--vdx-color-bg-surface); border: 1px solid var(--vdx-color-border-subtle);
    }
    .vdx-notification-item--unread { background-color: var(--vdx-color-action-primary-subtle); }
    .vdx-notification-item__title { font-size: 13px; font-weight: 600; margin: 0; }
    .vdx-notification-item__body { font-size: 12px; color: var(--vdx-color-text-secondary); margin: 2px 0; }
    .vdx-notification-item__time { font-size: 11px; color: var(--vdx-color-text-tertiary); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxNotificationFeedComponent {
  @Input() notifications: any[] = [];
  getIcon(severity: string): string {
    return severity === 'warning' ? 'alert-triangle' : 'bell';
  }
}

@Component({
  selector: 'vx-audit-log',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-audit-log">
      <div *ngFor="let change of changes" class="vdx-audit-change">
        <span class="vdx-audit-field">{{ change.field }}:</span>
        <span class="vdx-audit-prev">{{ change.previousValue || 'none' }}</span>
        <span class="vdx-audit-arrow">→</span>
        <span class="vdx-audit-next">{{ change.newValue }}</span>
        <span class="vdx-audit-by">by {{ change.changedBy }}</span>
      </div>
    </div>
  `,
  styles: [`
    .vdx-audit-log { display: flex; flex-direction: column; gap: 8px; font-size: 13px; }
    .vdx-audit-change { display: flex; gap: 8px; align-items: center; padding: 8px; background: var(--vdx-color-bg-surface); border-radius: 4px; }
    .vdx-audit-field { font-weight: 600; }
    .vdx-audit-prev { text-decoration: line-through; color: var(--vdx-primitive-red-600); }
    .vdx-audit-next { font-weight: 600; color: var(--vdx-primitive-green-600); }
    .vdx-audit-by { margin-left: auto; color: var(--vdx-color-text-tertiary); font-size: 12px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxAuditLogComponent {
  @Input() changes: any[] = [];
}

@Component({
  selector: 'vx-login-card',
  standalone: true,
  imports: [CommonModule, VxButtonComponent],
  template: `
    <div class="vdx-login-card">
      <h2 class="vdx-login-title">Sign in to VeriDex</h2>
      <p class="vdx-login-sub">Enterprise Risk & Policy Management Portal</p>
      
      <div class="vdx-login-form">
        <label class="vdx-label">Email address</label>
        <input type="email" class="vdx-input" placeholder="user@veridex.com" />
        
        <label class="vdx-label">Password</label>
        <input type="password" class="vdx-input" placeholder="••••••••" />

        <vx-button variant="primary" [fullWidth]="true">Sign In</vx-button>
      </div>
    </div>
  `,
  styles: [`
    .vdx-login-card {
      max-width: 400px; padding: 32px; background: white; border-radius: 12px;
      box-shadow: var(--vdx-shadow-lg); border: 1px solid var(--vdx-color-border-subtle);
    }
    .vdx-login-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 4px 0; }
    .vdx-login-sub { font-size: 13px; color: var(--vdx-color-text-secondary); margin-bottom: 24px; }
    .vdx-login-form { display: flex; flex-direction: column; gap: 12px; }
    .vdx-label { font-size: 13px; font-weight: 500; }
    .vdx-input { height: 40px; padding: 0 12px; border: 1px solid #8d94a3; border-radius: 6px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxLoginCardComponent {}

@Component({
  selector: 'vx-permission-matrix',
  standalone: true,
  imports: [CommonModule, VxCheckboxComponent],
  template: `
    <div class="vdx-permission-matrix">
      <table class="vdx-matrix-table">
        <thead>
          <tr>
            <th>Permission</th>
            <th *ngFor="let role of roles">{{ role }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let perm of permissions">
            <td class="vdx-perm-name">{{ perm }}</td>
            <td *ngFor="let role of roles" class="vdx-perm-check">
              <vx-checkbox [checked]="true"></vx-checkbox>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .vdx-permission-matrix { width: 100%; overflow-x: auto; }
    .vdx-matrix-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .vdx-matrix-table th, .vdx-matrix-table td { padding: 10px 16px; border-bottom: 1px solid var(--vdx-color-border-subtle); text-align: left; }
    .vdx-perm-name { font-weight: 600; }
    .vdx-perm-check { text-align: center; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxPermissionMatrixComponent {
  @Input() roles: string[] = ['Underwriter', 'Claims Handler', 'Auditor', 'Admin'];
  @Input() permissions: string[] = ['Bind Policies', 'Approve Claims', 'View Bordereaux', 'System Config'];
}
