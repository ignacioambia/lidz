import { Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'button[lidz-button]',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  variant = input<'outline' | 'solid'>('solid');
  type = input<'confirm' | 'cancel'>('confirm');

  @HostBinding('attr.data-variant')
  get variantAttr() {
    return this.variant();
  }

  @HostBinding('attr.data-type')
  get typeAttr() {
    return this.type();
  }
}
