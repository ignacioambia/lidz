import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendWaCodeDto } from './dto/send-wa-code.dto';
import { VerifyWACodeDto } from './dto/verify-wa-code.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('send-wa-code')
  sendWACode(@Body() { phoneNumber }: SendWaCodeDto) {
    return this.authService.sendWhatsappVerificationCode(phoneNumber);
  }

  @Public()
  @Post('verify-wa-code')
  verifyWACode(@Body() { phoneNumber, code }: VerifyWACodeDto) {
    return this.authService.verifyWhatsappCode(phoneNumber, code);
  }
}
