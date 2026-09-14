import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VxButtonComponent } from './components/button/button.component';
import { VxBadgeComponent } from './components/badge/badge.component';
import { VxChipComponent } from './components/chip/chip.component';
import { VxAvatarComponent } from './components/avatar/avatar.component';
import { VxPolicyStatusChipComponent } from './components/domain/domain-components.component';
import { VxTableComponent } from './components/data-grid/data-grid.component';

describe('VeriDex UI Component Library', () => {
  describe('VxButtonComponent', () => {
    let fixture: ComponentFixture<VxButtonComponent>;
    let component: VxButtonComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VxButtonComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(VxButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create button component', () => {
      expect(component).toBeTruthy();
    });

    it('should apply primary variant class by default', () => {
      const buttonEl: HTMLElement = fixture.nativeElement.querySelector('button');
      expect(buttonEl.classList.contains('vdx-btn--primary')).toBe(true);
    });

    it('should emit clicked event on click when not disabled', () => {
      let emitted = false;
      component.clicked.subscribe(() => { emitted = true; });
      const buttonEl: HTMLElement = fixture.nativeElement.querySelector('button');
      buttonEl.click();
      expect(emitted).toBe(true);
    });

    it('should disable button when loading is true', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      const buttonEl: HTMLButtonElement = fixture.nativeElement.querySelector('button');
      expect(buttonEl.disabled).toBe(true);
    });
  });

  describe('VxBadgeComponent', () => {
    let fixture: ComponentFixture<VxBadgeComponent>;
    let component: VxBadgeComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VxBadgeComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(VxBadgeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render success badge variant', () => {
      fixture.componentRef.setInput('variant', 'success');
      fixture.detectChanges();
      const spanEl: HTMLElement = fixture.nativeElement.querySelector('.vdx-badge');
      expect(spanEl.classList.contains('vdx-badge--success')).toBe(true);
    });
  });

  describe('VxChipComponent', () => {
    let fixture: ComponentFixture<VxChipComponent>;
    let component: VxChipComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VxChipComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(VxChipComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should toggle selection on click', () => {
      let selectedVal: boolean | null = null;
      component.selectedChange.subscribe(val => { selectedVal = val; });
      const buttonEl: HTMLElement = fixture.nativeElement.querySelector('.vdx-chip');
      buttonEl.click();
      expect(selectedVal).toBe(true);
    });
  });

  describe('VxAvatarComponent', () => {
    let fixture: ComponentFixture<VxAvatarComponent>;
    let component: VxAvatarComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VxAvatarComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(VxAvatarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should generate initials from name', () => {
      expect(component.getInitials('Priya Sharma')).toBe('PS');
    });
  });

  describe('VxPolicyStatusChipComponent', () => {
    let fixture: ComponentFixture<VxPolicyStatusChipComponent>;
    let component: VxPolicyStatusChipComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VxPolicyStatusChipComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(VxPolicyStatusChipComponent);
      component = fixture.componentInstance;
    });

    it('should render Bound status with check icon and success variant', () => {
      fixture.componentRef.setInput('status', 'bound');
      fixture.detectChanges();
      expect(component.config.label).toBe('Bound');
      expect(component.config.variant).toBe('success');
    });
  });

  describe('VxTableComponent', () => {
    let fixture: ComponentFixture<VxTableComponent>;
    let component: VxTableComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VxTableComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(VxTableComponent);
      component = fixture.componentInstance;
      component.columns = [{ key: 'policy', header: 'Policy' }];
      component.data = [{ policy: 'POL-001' }];
      fixture.detectChanges();
    });

    it('should render data rows correctly', () => {
      const rows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(rows.length).toBe(1);
    });
  });
});
