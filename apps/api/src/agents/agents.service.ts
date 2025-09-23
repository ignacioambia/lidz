import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDocument } from '../schemas/agent.schema';
import { Model, Types } from 'mongoose';
import { AgentsAPI } from '@lidz/shared';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent.name)
    private agentModel: Model<AgentDocument>,
  ) {}

  async create(
    createAgentDto: CreateAgentDto,
    providerId: Types.ObjectId,
  ): Promise<AgentsAPI.Post.Response> {
    const { agentId } = await this.agentModel.create({
      ...createAgentDto,
      providerId,
    });
    return { agentId };
  }

  findAll() {
    return `This action returns all agents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
