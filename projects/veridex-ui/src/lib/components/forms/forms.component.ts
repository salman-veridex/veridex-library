import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Directive, HostBinding, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { VxIconComponent } from '../icon/icon.component';

@Component({
  selector: 'vx-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vdx-form-field" [class.vdx-form-field--invalid]="!!error">
      <label *ngIf="label" class="vdx-label">
        {{ label }}
        <span *ngIf="required" class="vdx-label__asterisk" aria-hidden="true">*</span>
      </label>

      <div class="vdx-form-field__control">
        <ng-content></ng-content>
      </div>

      <span *ngIf="hint && !error" class="vdx-form-field__hint">{{ hint }}</span>
      <span *ngIf="error" class="vdx-form-field__error" role="alert">{{ error }}</span>
    </div>
  `,
  styles: [`
    .vdx-form-field {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--vdx-space-4);
      width: 100%;
    }
    .vdx-label {
      font-family: var(--vdx-type-family-primary);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--vdx-color-text-primary);
      margin-bottom: var(--vdx-space-1-5);
    }
    .vdx-label__asterisk {
      color: var(--vdx-color-text-error);
      margin-left: 2px;
    }
    .vdx-form-field__control { position: relative; width: 100%; }
    .vdx-form-field__hint {
      font-family: var(--vdx-type-family-primary);
      font-size: 0.75rem;
      color: var(--vdx-color-text-secondary);
      margin-top: var(--vdx-space-1);
    }
    .vdx-form-field__error {
      font-family: var(--vdx-type-family-primary);
      font-size: 0.75rem;
      color: var(--vdx-color-text-error);
      margin-top: var(--vdx-space-1);
      font-weight: 500;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxFormFieldComponent {
  @Input() label?: string;
  @Input() required: boolean = false;
  @Input() hint?: string;
  @Input() error?: string;
}

@Directive({
  selector: 'input[vxInput], textarea[vxInput]',
  standalone: true,
})
export class VxInputDirective {
  @HostBinding('class.vdx-input') isInput = true;
  @Input() @HostBinding('attr.aria-invalid') invalid: boolean | null = null;
}

@Component({
  selector: 'vx-input',
  standalone: true,
  imports: [CommonModule, FormsModule, VxIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="vdx-input-wrapper" [class.vdx-input-wrapper--disabled]="disabled">
      <span *ngIf="prefixIcon" class="vdx-input__prefix">
        <vx-icon [name]="prefixIcon" size="sm"></vx-icon>
      </span>

      <input
        [type]="type"
        class="vdx-input"
        [class.vdx-input--prefixed]="!!prefixIcon"
        [class.vdx-input--suffixed]="!!suffixIcon"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [attr.aria-invalid]="invalid ? 'true' : null"
        [ngModel]="value()"
        (ngModelChange)="onModelChange($event)"
        (blur)="onTouched()" />

      <span *ngIf="suffixIcon" class="vdx-input__suffix">
        <vx-icon [name]="suffixIcon" size="sm"></vx-icon>
      </span>
    </div>
  `,
  styles: [`
    .vdx-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }
    .vdx-input {
      height: 40px;
      padding: 0 var(--vdx-space-3);
      border: 1px solid var(--vdx-primitive-neutral-400, #8d94a3);
      border-radius: var(--vdx-radius-md);
      font-family: var(--vdx-type-family-primary);
      font-size: 0.875rem;
      color: var(--vdx-color-text-primary);
      background-color: var(--vdx-color-bg-surface);
      width: 100%;
      box-sizing: border-box;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .vdx-input:focus {
      outline: none;
      border-color: var(--vdx-color-action-primary);
      box-shadow: var(--vdx-shadow-focus);
    }
    .vdx-input[aria-invalid="true"] {
      border-color: var(--vdx-color-border-error);
      box-shadow: var(--vdx-shadow-focus-error);
    }
    .vdx-input:disabled {
      background-color: var(--vdx-color-form-input-bg-disabled);
      color: var(--vdx-color-text-disabled);
      cursor: not-allowed;
    }
    .vdx-input--prefixed { padding-left: var(--vdx-space-8); }
    .vdx-input--suffixed { padding-right: var(--vdx-space-8); }

    .vdx-input__prefix, .vdx-input__suffix {
      position: absolute;
      display: flex;
      align-items: center;
      color: var(--vdx-color-text-tertiary);
      pointer-events: none;
    }
    .vdx-input__prefix { left: var(--vdx-space-3); }
    .vdx-input__suffix { right: var(--vdx-space-3); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxInputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() invalid: boolean = false;
  @Input() prefixIcon?: string;
  @Input() suffixIcon?: string;

  value = signal<string>('');

  onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: string): void {
    this.value.set(val || '');
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onModelChange(val: string): void {
    this.value.set(val);
    this.onChange(val);
  }
}

@Component({
  selector: 'vx-select',
  standalone: true,
  imports: [CommonModule, FormsModule, VxIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div class="vdx-select-wrapper">
      <select
        class="vdx-select"
        [disabled]="disabled"
        [attr.aria-invalid]="invalid ? 'true' : null"
        [ngModel]="value()"
        (ngModelChange)="onModelChange($event)"
        (blur)="onTouched()">
        <option *ngIf="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option *ngFor="let opt of options" [value]="opt.value">{{ opt.label }}</option>
      </select>
      <vx-icon name="chevron-down" size="sm" class="vdx-select__arrow"></vx-icon>
    </div>
  `,
  styles: [`
    .vdx-select-wrapper { position: relative; width: 100%; display: flex; align-items: center; }
    .vdx-select {
      height: 40px;
      padding: 0 var(--vdx-space-8) 0 var(--vdx-space-3);
      border: 1px solid var(--vdx-primitive-neutral-400, #8d94a3);
      border-radius: var(--vdx-radius-md);
      font-family: var(--vdx-type-family-primary);
      font-size: 0.875rem;
      color: var(--vdx-color-text-primary);
      background-color: var(--vdx-color-bg-surface);
      width: 100%;
      appearance: none;
      box-sizing: border-box;
      cursor: pointer;
    }
    .vdx-select:focus {
      outline: none;
      border-color: var(--vdx-color-action-primary);
      box-shadow: var(--vdx-shadow-focus);
    }
    .vdx-select__arrow {
      position: absolute;
      right: var(--vdx-space-3);
      pointer-events: none;
      color: var(--vdx-color-text-secondary);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxSelectComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: any }[] = [];
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() invalid: boolean = false;

  value = signal<any>('');

  onChange: (val: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: any): void { this.value.set(val ?? ''); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onModelChange(val: any): void {
    this.value.set(val);
    this.onChange(val);
  }
}

@Component({
  selector: 'vx-checkbox',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxCheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <label class="vdx-checkbox" [class.vdx-checkbox--disabled]="disabled">
      <input
        type="checkbox"
        class="vdx-checkbox__input"
        [checked]="checkedSignal()"
        [disabled]="disabled"
        (change)="onToggle($event)"
        (blur)="onTouched()" />
      <span class="vdx-checkbox__box" [class.vdx-checkbox__box--checked]="checkedSignal()">
        <vx-icon *ngIf="checkedSignal()" name="check" size="xs"></vx-icon>
      </span>
      <span class="vdx-checkbox__label"><ng-content></ng-content></span>
    </label>
  `,
  styles: [`
    .vdx-checkbox {
      display: inline-flex;
      align-items: center;
      gap: var(--vdx-space-2.5, 10px);
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
      color: var(--vdx-color-text-primary);
      cursor: pointer;
      user-select: none;
    }
    .vdx-checkbox__input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    .vdx-checkbox__box {
      width: 18px;
      height: 18px;
      border: 1px solid var(--vdx-primitive-neutral-400, #8d94a3);
      border-radius: var(--vdx-radius-sm);
      background-color: var(--vdx-color-bg-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    .vdx-checkbox__box--checked {
      background-color: var(--vdx-color-action-primary);
      border-color: var(--vdx-color-action-primary);
      color: white;
    }
    .vdx-checkbox__input:focus-visible + .vdx-checkbox__box {
      outline: 3px solid var(--vdx-color-border-focus);
      outline-offset: 2px;
    }
    .vdx-checkbox--disabled { cursor: not-allowed; opacity: 0.5; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxCheckboxComponent implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() set checked(val: boolean) {
    this.checkedSignal.set(!!val);
  }
  get checked(): boolean {
    return this.checkedSignal();
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  checkedSignal = signal<boolean>(false);

  onChange: (val: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: boolean): void { this.checkedSignal.set(!!val); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onToggle(event: Event): void {
    if (this.disabled) return;
    const newVal = (event.target as HTMLInputElement).checked;
    this.checkedSignal.set(newVal);
    this.onChange(newVal);
    this.checkedChange.emit(newVal);
  }
}

@Component({
  selector: 'vx-toggle',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxToggleComponent),
      multi: true,
    },
  ],
  template: `
    <label class="vdx-toggle" [class.vdx-toggle--disabled]="disabled">
      <input
        type="checkbox"
        class="vdx-toggle__input"
        [checked]="checkedSignal()"
        [disabled]="disabled"
        (change)="onToggle($event)"
        (blur)="onTouched()" />
      <span class="vdx-toggle__track" [class.vdx-toggle__track--checked]="checkedSignal()">
        <span class="vdx-toggle__thumb"></span>
      </span>
      <span class="vdx-toggle__label"><ng-content></ng-content></span>
    </label>
  `,
  styles: [`
    .vdx-toggle {
      display: inline-flex;
      align-items: center;
      gap: var(--vdx-space-3);
      font-family: var(--vdx-type-family-primary);
      font-size: 14px;
      color: var(--vdx-color-text-primary);
      cursor: pointer;
      user-select: none;
    }
    .vdx-toggle__input { position: absolute; opacity: 0; width: 0; height: 0; }
    .vdx-toggle__track {
      width: 44px;
      height: 24px;
      background-color: var(--vdx-primitive-neutral-500, #717887);
      border-radius: var(--vdx-radius-full);
      position: relative;
      transition: background-color 0.2s ease;
    }
    .vdx-toggle__track--checked {
      background-color: var(--vdx-color-action-primary);
    }
    .vdx-toggle__thumb {
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.2s ease;
    }
    .vdx-toggle__track--checked .vdx-toggle__thumb {
      transform: translateX(20px);
    }
    .vdx-toggle__input:focus-visible + .vdx-toggle__track {
      outline: 3px solid var(--vdx-color-border-focus);
      outline-offset: 2px;
    }
    .vdx-toggle--disabled { cursor: not-allowed; opacity: 0.5; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxToggleComponent implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() set checked(val: boolean) {
    this.checkedSignal.set(!!val);
  }
  get checked(): boolean {
    return this.checkedSignal();
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  checkedSignal = signal<boolean>(false);

  onChange: (val: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: boolean): void { this.checkedSignal.set(!!val); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onToggle(event: Event): void {
    if (this.disabled) return;
    const newVal = (event.target as HTMLInputElement).checked;
    this.checkedSignal.set(newVal);
    this.onChange(newVal);
    this.checkedChange.emit(newVal);
  }
}

@Component({
  selector: 'vx-file-upload',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div
      class="vdx-file-upload"
      [class.vdx-file-upload--dragging]="isDragging"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)">
      <vx-icon name="upload-cloud" size="xl" class="vdx-file-upload__icon"></vx-icon>
      <div class="vdx-file-upload__text">
        <span class="vdx-file-upload__title">Drag and drop files here, or</span>
        <label class="vdx-file-upload__browse">
          Browse
          <input
            type="file"
            class="vdx-visually-hidden"
            [accept]="accept"
            [multiple]="multiple"
            (change)="onFileSelected($event)" />
        </label>
      </div>
      <span class="vdx-file-upload__hint" *ngIf="hint">{{ hint }}</span>
    </div>
  `,
  styles: [`
    .vdx-file-upload {
      border: 2px dashed var(--vdx-primitive-neutral-400, #8d94a3);
      border-radius: var(--vdx-radius-lg);
      padding: var(--vdx-space-6);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--vdx-space-3);
      background-color: var(--vdx-color-bg-surface);
      text-align: center;
      transition: border-color 0.2s, background-color 0.2s;
    }
    .vdx-file-upload--dragging {
      border-color: var(--vdx-color-action-primary);
      background-color: var(--vdx-color-action-primary-subtle);
    }
    .vdx-file-upload__icon { color: var(--vdx-color-text-secondary); }
    .vdx-file-upload__browse {
      color: var(--vdx-color-action-primary);
      font-weight: 600;
      cursor: pointer;
      margin-left: 4px;
    }
    .vdx-file-upload__browse:hover { text-decoration: underline; }
    .vdx-file-upload__hint {
      font-size: 0.75rem;
      color: var(--vdx-color-text-tertiary);
    }
    .vdx-visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxFileUploadComponent {
  @Input() accept?: string;
  @Input() multiple: boolean = false;
  @Input() hint?: string = 'Supports PDF, CSV, PNG, JPG up to 10MB';

  @Output() filesSelected = new EventEmitter<File[]>();

  isDragging = false;

  onDragOver(e: DragEvent): void { e.preventDefault(); this.isDragging = true; }
  onDragLeave(e: DragEvent): void { e.preventDefault(); this.isDragging = false; }
  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.isDragging = false;
    if (e.dataTransfer?.files) {
      this.filesSelected.emit(Array.from(e.dataTransfer.files));
    }
  }

  onFileSelected(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.filesSelected.emit(Array.from(input.files));
    }
  }
}

@Component({
  selector: 'vx-currency-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VxCurrencyInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="vdx-currency-input">
      <span class="vdx-currency-input__symbol">{{ symbol }}</span>
      <input
        type="text"
        class="vdx-input vdx-input--prefixed"
        [value]="displayValue()"
        [disabled]="disabled"
        (focus)="onFocus()"
        (blur)="onBlur()"
        (input)="onInput($event)" />
    </div>
  `,
  styles: [`
    .vdx-currency-input { position: relative; width: 100%; display: flex; align-items: center; }
    .vdx-currency-input__symbol {
      position: absolute;
      left: var(--vdx-space-3);
      font-weight: 600;
      color: var(--vdx-color-text-secondary);
      pointer-events: none;
    }
    .vdx-input {
      height: 40px;
      padding: 0 var(--vdx-space-3) 0 var(--vdx-space-8);
      border: 1px solid var(--vdx-primitive-neutral-400, #8d94a3);
      border-radius: var(--vdx-radius-md);
      font-family: var(--vdx-type-family-primary);
      font-size: 0.875rem;
      width: 100%;
      box-sizing: border-box;
    }
    .vdx-input:focus { outline: none; border-color: var(--vdx-color-action-primary); box-shadow: var(--vdx-shadow-focus); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxCurrencyInputComponent implements ControlValueAccessor {
  @Input() currency: string = 'USD';
  @Input() symbol: string = '$';
  @Input() disabled: boolean = false;

  rawValue = signal<number | null>(null);
  displayValue = signal<string>('');
  isFocused = false;

  onChange: (val: number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: number | null): void {
    this.rawValue.set(val);
    this.updateDisplayValue();
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

  onFocus(): void {
    this.isFocused = true;
    if (this.rawValue() !== null) {
      this.displayValue.set(this.rawValue()!.toString());
    }
  }

  onBlur(): void {
    this.isFocused = false;
    this.updateDisplayValue();
    this.onTouched();
  }

  onInput(e: Event): void {
    const valStr = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, '');
    const num = parseFloat(valStr);
    const parsed = isNaN(num) ? null : num;
    this.rawValue.set(parsed);
    this.onChange(parsed);
  }

  private updateDisplayValue(): void {
    const val = this.rawValue();
    if (val === null || isNaN(val)) {
      this.displayValue.set('');
    } else {
      this.displayValue.set(val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
  }
}

@Component({
  selector: 'vx-validation-summary',
  standalone: true,
  imports: [CommonModule, VxIconComponent],
  template: `
    <div *ngIf="errors.length > 0" class="vdx-validation-summary" role="alert" tabindex="-1">
      <div class="vdx-validation-summary__title">
        <vx-icon name="alert-circle" size="md"></vx-icon>
        <span>Please fix the following errors before continuing:</span>
      </div>
      <ul class="vdx-validation-summary__list">
        <li *ngFor="let err of errors">
          <a [href]="'#' + err.fieldId" (click)="scrollToField(err.fieldId, $event)">
            {{ err.message }}
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .vdx-validation-summary {
      background-color: var(--vdx-color-status-error-bg);
      border: 1px solid var(--vdx-color-status-error-border);
      border-radius: var(--vdx-radius-md);
      padding: var(--vdx-space-4);
      margin-bottom: var(--vdx-space-5);
    }
    .vdx-validation-summary__title {
      display: flex;
      align-items: center;
      gap: var(--vdx-space-2);
      font-weight: 600;
      color: var(--vdx-color-text-error);
      margin-bottom: var(--vdx-space-2);
    }
    .vdx-validation-summary__list {
      margin: 0;
      padding-left: var(--vdx-space-6);
      color: var(--vdx-color-text-error);
    }
    .vdx-validation-summary__list a {
      color: var(--vdx-color-text-error);
      text-decoration: underline;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VxValidationSummaryComponent {
  @Input() errors: { fieldId: string; message: string }[] = [];

  scrollToField(id: string, e: Event): void {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.focus();
  }
}
