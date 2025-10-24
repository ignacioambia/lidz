import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendWaCodeDto } from './dto/send-wa-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-wa-code')
  create(@Body() { phoneNumber }: SendWaCodeDto) {
    return this.authService.sendWhatsappVerificationCode(phoneNumber);
  }
}
