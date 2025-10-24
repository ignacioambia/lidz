import { Injectable } from '@nestjs/common';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Injectable()
export class AuthService {
  constructor(private readonly whatsappService: WhatsappService) {}
  sendWhatsappVerificationCode(phoneNumber: string) {
    // Logic to send WhatsApp verification code
    return this.whatsappService.sendTemplate({
      // TODO: This phone number id should be dynamic based on the environment or configuration
      phoneNumberId: '756377980902979',
      to: phoneNumber,
      templateName: 'verify_code',
    });
  }
}
