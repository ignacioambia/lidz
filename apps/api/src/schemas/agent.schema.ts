import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { nanoid } from 'nanoid';

export type AgentDocument = Agent & Document;

@Schema({ timestamps: true })
export class Agent {
  //TODO: The default object id must be removed and replaced with the actual provider id when the authentication system is implemented
  @Prop({
    type: Types.ObjectId,
    required: true,
  })
  providerId: Types.ObjectId;

  @Prop()
  agentName: string;

  @Prop({ required: true })
  instructions: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: () => nanoid(), index: true, unique: true })
  agentId: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
