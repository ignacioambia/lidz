import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true })
  phoneNumber: string;

  createdAt: Date;

  updatedAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
