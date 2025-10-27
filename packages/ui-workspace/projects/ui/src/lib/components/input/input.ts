import {
  Component,
  forwardRef,
  inject,
  Injector,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
//TODO: Add disabled state
//TODO: Add unit testing
@Component({
  selector: 'lidz-input',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LidzInput),
      multi: true,
    },
    provideNgxMask(),
  ],
  host: {
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut()',
  },
})
export class LidzInput implements ControlValueAccessor, OnInit {
  public active = false;
  public labelUp = false;
  private _value = '';
  private ngControl: NgControl | undefined = undefined;
  private injector = inject(Injector);

  public ngOnInit(): void {
    try {
      this.ngControl = this.injector.get(NgControl);
    } catch (e) {
      if ((e as Error)?.name !== 'NullInjectorError') throw e;
      this.ngControl = undefined;
    }
  }

  public get value() {
    return this._value;
  }
  public set value(newValue) {
    this._value = newValue;
    // If a placeholder is set, labelUp should be true
    this.labelUp =
      this.active || this._value.length > 0 || !!this.placeholder();
  }

  public get hasError(): boolean {
    if (this.ngControl) {
      const { touched, dirty, invalid } = this.ngControl;
      return (invalid && touched && dirty) || false;
    }
    return false;
  }

  public label = input<string>('');
  public placeholder = input<string>('');
  public mask = input<string>('');
  public errorMessage = input<string>('');
  public type = input<string>('text');

  private onChange: (value: string) => void = () => {
    console.warn('missing onchange function');
  };

  private onTouhed: () => void = () => {
    console.warn('missing onchange function');
  };

  onFocusIn() {
    this.active = true;
    this.labelUp = true;
  }

  onFocusOut() {
    this.active = false;
    this.labelUp = this.value.length > 0 || !!this.placeholder();
    this.onTouhed();
  }

  writeValue(newValue: string): void {
    this.value = newValue;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouhed = fn;
  }

  change(value: string) {
    this.onChange(value);
  }
}
