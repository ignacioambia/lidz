import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  controllers: [AuthController],
  imports: [WhatsappModule],
  providers: [AuthService],
})
export class AuthModule {}
