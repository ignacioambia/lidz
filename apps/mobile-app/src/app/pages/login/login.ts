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
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [Button, LidzInput, FormsModule, ReactiveFormsModule, MatSnackBarModule],
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
  public verifyingCode = false;

  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  sendWACode() {
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

  verifyWACode() {
    const phoneNumber = this.phoneNumberControl.value;
    const code = this.verificationCode.value;

    if (!phoneNumber || !code) {
      console.error('Phone number and verification code are required');
      return;
    }

    this.verifyingCode = true;
    this.authService.verifyWACode(phoneNumber, code).subscribe({
      next: (response) => {
        Preferences.set({ key: 'auth_token', value: response.token });
        this.router.navigate(['/']);
        this.verifyingCode = false;
        // Proceed to the next step after successful verification
      },
      error: (error) => {
        this.snackBar.open('Código incorrecto. Intenta de nuevo.', 'Cerrar', { duration: 3000 });
        console.error('Error verifying WA code', error);
        this.verifyingCode = false;
      },
    });
  }

  async pasteFromClipboard() {
    try {
      const { value } = await Clipboard.read();
      if (value) {
        this.verificationCode.setValue(value);
      }
    } catch (error) {
      console.error('Error reading from clipboard', error);
    }
  }
}
