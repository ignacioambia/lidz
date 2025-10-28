import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VerificationCode,
  VerificationCodeSchema,
} from './schemas/verification-code.schema';
import {
  Customer,
  CustomerSchema,
} from 'src/customers/schemas/customer.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    WhatsappModule,
    MongooseModule.forFeature([
      {
        name: VerificationCode.name,
        schema: VerificationCodeSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      //TODO: Managing expiration time is missing.
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
