import { Component, signal } from '@angular/core';
import { Button, LidzInput } from '@lidz/ui';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    Button,
    LidzInput,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public phoneNumberControl = new FormControl('');
  currentStep = signal<number>(0);

  verifyNumber() {
    const phoneNumber = this.phoneNumberControl.value;
    console.log('Verifying phone number:', phoneNumber);
    this.currentStep.set(1);
    // Add your verification logic here
  }
}
