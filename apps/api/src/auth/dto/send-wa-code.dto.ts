import { IsString } from 'class-validator';

export class SendWaCodeDto {
  @IsString()
  phoneNumber: string;
}
