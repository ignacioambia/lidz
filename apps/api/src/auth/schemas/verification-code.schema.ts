import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VerificationCodeDocument = VerificationCode & Document;

@Schema({ timestamps: true })
export class VerificationCode {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({
    required: true,
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
  })
  expiresAt: Date;
}

export const VerificationCodeSchema =
  SchemaFactory.createForClass(VerificationCode);
