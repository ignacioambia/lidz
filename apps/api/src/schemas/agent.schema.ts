import { AgentActionTemplate, AgentActionTemplateStatus } from '@lidz/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { nanoid } from 'nanoid';

export type AgentDocument = Agent & Document;

@Schema()
export class AgentActionModel {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true, enum: ['pending', 'confirmed', 'rejected'] })
  status: AgentActionTemplateStatus;

  @Prop({ type: Object, required: true })
  tool: Record<string, any>;
}

export type AgentActionDocument = AgentActionModel & Document;
export const AgentActionSchema = SchemaFactory.createForClass(AgentActionModel);

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

  @Prop({ default: () => nanoid(), index: true, unique: true })
  agentId: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [AgentActionSchema], default: [] })
  actions: AgentActionTemplate[];

  createdAt: Date;

  updatedAt: Date;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
