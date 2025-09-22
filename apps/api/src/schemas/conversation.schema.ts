import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AgentInputItem } from '@openai/agents';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ required: true })
  assistantId: string; // Phone number or user ID

  @Prop({ required: true })
  userId: string; // Bot phone number or ID

  @Prop({ default: [] })
  messages: AgentInputItem[];

  @Prop({ default: true })
  isActive: boolean;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
