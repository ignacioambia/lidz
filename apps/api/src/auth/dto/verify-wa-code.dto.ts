import { PHONE_NUMBER_REGEX, VERIFICATION_CODE_REGEX } from '@lidz/shared';
import { IsString, Matches } from 'class-validator';

export class VerifyWACodeDto {
  @IsString()
  @Matches(PHONE_NUMBER_REGEX, { message: 'Invalid phone number format.' })
  phoneNumber: string;

  @IsString()
  @Matches(VERIFICATION_CODE_REGEX, {
    message: 'Code must be a 6-digit number.',
  })
  code: string;
}
