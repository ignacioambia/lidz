import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentInstructionsDto } from './dto/update-agent-instructions.dto';
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

  async updateInstructions(
    agentId: string,
    { instructions }: UpdateAgentInstructionsDto,
  ): Promise<AgentsAPI.PatchInstructions.Response> {
    const agent = await this.agentModel
      .findOneAndUpdate(
        { agentId },
        { instructions },
        {
          new: true,
        },
      )
      .exec();

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return {
      agentId: agent.agentId,
      message: 'Instrucciones actualizadas con éxito',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
