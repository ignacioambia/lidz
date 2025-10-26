import { Component, HostBinding, input } from '@angular/core';
import { LdLoaderDots } from '../loader-dots/loader-dots';

@Component({
  selector: 'button[lidz-button]',
  imports: [LdLoaderDots],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class.disabled]': 'disabled()',
    '[class.loading]': 'loading()',
  },
})
export class Button {
  variant = input<'outline' | 'solid'>('solid');
  type = input<'confirm' | 'cancel'>('confirm');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);

  @HostBinding('attr.data-variant')
  get variantAttr() {
    return this.variant();
  }

  @HostBinding('attr.data-type')
  get typeAttr() {
    return this.type();
  }
}
