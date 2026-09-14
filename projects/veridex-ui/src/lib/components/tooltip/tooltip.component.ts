import { Component, Input, Directive, ElementRef, HostListener, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[vxTooltip]',
  standalone: true,
})
export class VxTooltipDirective {
  @Input('vxTooltip') text: string = '';

  private tooltipEl?: HTMLElement;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  @HostListener('focus')
  show(): void {
    if (!this.text) return;
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = 'vdx-tooltip';
    this.tooltipEl.textContent = this.text;
    this.tooltipEl.setAttribute('role', 'tooltip');

    document.body.appendChild(this.tooltipEl);
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.tooltipEl.style.position = 'fixed';
    this.tooltipEl.style.top = `${rect.top - 36}px`;
    this.tooltipEl.style.left = `${rect.left + rect.width / 2}px`;
    this.tooltipEl.style.transform = 'translateX(-50%)';
    this.tooltipEl.style.zIndex = '500';
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hide(): void {
    if (this.tooltipEl) {
      this.tooltipEl.remove();
      this.tooltipEl = undefined;
    }
  }
}

@Directive({
  selector: '[vxPopover]',
  standalone: true,
})
export class VxPopoverDirective {
  @Input('vxPopover') popoverContentTemplate?: any;

  private isVisible = false;

  constructor(private el: ElementRef) {}

  @HostListener('click')
  toggle(): void {
    this.isVisible = !this.isVisible;
    // Popover toggle handling primitive
  }
}
