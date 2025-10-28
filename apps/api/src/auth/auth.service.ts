import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { customAlphabet } from 'nanoid';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
import {
  VerificationCode,
  VerificationCodeDocument,
} from './schemas/verification-code.schema';
import { Model } from 'mongoose';
import { Customer } from 'src/customers/schemas/customer.schema';
import { JwtService } from '@nestjs/jwt';

const nanoid = customAlphabet('0123456789', 6);
@Injectable()
export class AuthService {
  constructor(
    private readonly whatsappService: WhatsappService,
    @InjectModel(VerificationCode.name)
    private readonly verificationCodeModel: Model<VerificationCodeDocument>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
    private jwtService: JwtService,
  ) {}

  async verifyWhatsappCode(phoneNumber: string, code: string) {
    const record = await this.verificationCodeModel
      .findOne({ phoneNumber, code })
      .sort({ createdAt: -1 });

    if (!record) {
      throw new BadRequestException('Invalid verification code.');
    }

    if (record.expiresAt < new Date()) {
      throw new BadRequestException('Verification code has expired.');
    }

    await this.verificationCodeModel.deleteMany({ phoneNumber });

    let user = await this.customerModel.findOne({ phoneNumber });
    if (!user) {
      user = await this.customerModel.create({ phoneNumber });
    }

    const token = this.jwtService.sign({
      sub: user._id,
      phoneNumber: user.phoneNumber,
    });

    return { token };
  }

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
