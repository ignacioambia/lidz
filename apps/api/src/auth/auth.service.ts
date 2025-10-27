import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { customAlphabet } from 'nanoid';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
import {
  VerificationCode,
  VerificationCodeDocument,
} from './schemas/verification-code.schema';
import { Model } from 'mongoose';

const nanoid = customAlphabet('0123456789', 6);
@Injectable()
export class AuthService {
  constructor(
    private readonly whatsappService: WhatsappService,
    @InjectModel(VerificationCode.name)
    private readonly verificationCodeModel: Model<VerificationCodeDocument>,
  ) {}
  async sendWhatsappVerificationCode(phoneNumber: string) {
    const code = nanoid();
    await this.verificationCodeModel.create({
      code,
      phoneNumber,
    });
    await this.sendPhoneVerificationCodeViaWhatsapp(phoneNumber, code);
    return { message: 'Verification code sent successfully' };
  }

  private async sendPhoneVerificationCodeViaWhatsapp(
    phoneNumber: string,
    code: string,
  ) {
    await this.whatsappService.sendTemplate({
      // TODO: This phone number id should be dynamic based on the environment or configuration
      phoneNumberId: '756377980902979',
      to: phoneNumber,
      templateName: 'verify_code',
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: code,
            },
          ],
        },
        {
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [
            {
              type: 'text',
              text: code,
            },
          ],
        },
      ],
    });
  }
}
