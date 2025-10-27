import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VerificationCode,
  VerificationCodeSchema,
} from './schemas/verification-code.schema';

@Module({
  controllers: [AuthController],
  imports: [
    WhatsappModule,
    MongooseModule.forFeature([
      {
        name: VerificationCode.name,
        schema: VerificationCodeSchema,
      },
    ]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
