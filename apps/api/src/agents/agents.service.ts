import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentInstructionsDto } from './dto/update-agent-instructions.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDocument } from '../schemas/agent.schema';
import { Model, Types } from 'mongoose';
import { run } from '@openai/agents';
import { AgentsAPI } from '@lidz/shared';
import { agentManager } from './agent-manager.agent';

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

  async detectRequiredActions(instructions: string): Promise<string[]> {
    const actionsFound = await run(
      agentManager,
      `¿Las siguientes instrucciones requieren de alguna acción?\n\n${instructions}`,
    );

    return (actionsFound.finalOutput as { actions: string[] }).actions;
  }

  async findOne(agentId: string): Promise<AgentsAPI.GetById.Response> {
    const agent = await this.agentModel.findOne({ agentId }).exec();
    if (!agent) {
      throw new NotFoundException('Agent not found');
    }
    return {
      instructions: agent.instructions,
      createdAt: agent.createdAt.toISOString(),
      updatedAt: agent.updatedAt.toISOString(),
    };
  }

  async updateInstructions(
    agentId: string,
    { instructions }: UpdateAgentInstructionsDto,
  ): Promise<AgentsAPI.PatchInstructions.Response> {
    // const actionsFound = await this.detectRequiredActions(instructions);

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
