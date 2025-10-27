import { Component, inject, signal } from '@angular/core';
import { Button, LidzInput } from '@lidz/ui';
import { PHONE_NUMBER_REGEX, VERIFICATION_CODE_REGEX } from '@lidz/shared';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Clipboard } from '@capacitor/clipboard';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [Button, LidzInput, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public phoneNumberControl = new FormControl('', [
    Validators.required,
    Validators.pattern(PHONE_NUMBER_REGEX),
  ]);
  public verificationCode = new FormControl('', [
    Validators.required,
    Validators.pattern(VERIFICATION_CODE_REGEX),
  ]);
  currentStep = signal<number>(0);
  private authService = inject(AuthService);

  public sendingCode = false;

  verifyNumber() {
    const phoneNumber = this.phoneNumberControl.value;

    if (!phoneNumber) {
      console.error('Phone number is required');
      return;
    }
    this.sendingCode = true;
    this.authService.sendWaCode(phoneNumber).subscribe({
      next: (response) => {
        console.log('WA code sent successfully', response);
        this.currentStep.set(1);
        this.sendingCode = false;
      },
      error: (error) => {
        console.error('Error sending WA code', error);
        this.sendingCode = false;
      },
    });
  }

  async pasteFromClipboard() {
    try {
      const { value } = await Clipboard.read();
      if (value) {
        console.log(value);
      }
    } catch (error) {
      console.error('Error reading from clipboard', error);
    }
  }
}
