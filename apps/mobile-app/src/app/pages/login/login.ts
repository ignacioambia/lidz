import { Component, inject, signal } from '@angular/core';
import { Button, LidzInput } from '@lidz/ui';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-login',
  imports: [
    Button,
    LidzInput,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  public phoneNumberControl = new FormControl('', [Validators.required]);
  public verificationCode = new FormControl('', [Validators.required]);
  currentStep = signal<number>(0);
  private authService = inject(AuthService);

  verifyNumber() {
    const phoneNumber = this.phoneNumberControl.value;

    if(!phoneNumber) {
      console.error('Phone number is required');
      return;
    }
    
    this.authService.sendWaCode(phoneNumber).subscribe({
      next: (response) => {
        console.log('WA code sent successfully', response);
        this.currentStep.set(1);
      },
      error: (error) => {
        console.error('Error sending WA code', error);
      }
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
