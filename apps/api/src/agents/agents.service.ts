import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentInstructionsDto } from './dto/update-agent-instructions.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Agent, AgentDocument } from '../schemas/agent.schema';
import { Model, Types } from 'mongoose';
import { FunctionTool, run, tool } from '@openai/agents';
import {
  AgentAction,
  AgentActionTemplateStatus,
  AgentActionTemplate,
  AgentsAPI,
} from '@lidz/shared';
import { agentManager } from './agent-manager.agent';
import { ActionsService } from 'src/actions/actions.service';

@Injectable()
export class AgentsService {
  constructor(
    @InjectModel(Agent.name)
    private agentModel: Model<AgentDocument>,
    private actionsService: ActionsService,
  ) {}

  async create(
    createAgentDto: CreateAgentDto,
    providerId: Types.ObjectId,
  ): Promise<AgentsAPI.Post.Response> {
    const actionsFound = await this.detectRequiredActions(
      createAgentDto.instructions,
    );

    const { agentId } = await this.agentModel.create({
      ...createAgentDto,
      actions: actionsFound,
      providerId,
    });
    return { agentId };
  }

  findAll() {
    return `This action returns all agents`;
  }

  async detectRequiredActions(instructions: string): Promise<AgentAction[]> {
    const actionsFound = await run(
      agentManager,
      `¿Las siguientes instrucciones requieren de alguna acción?\n\n${instructions}`,
    );

    return (actionsFound.finalOutput as { actions: AgentAction[] }).actions.map(
      (action) => ({
        ...action,
        status: 'pending',
      }),
    );
  }

  getAgentFunctionTools(actions: AgentActionTemplate[]): FunctionTool[] {
    return actions.map(({ tool: storedTool, type }) =>
      tool({
        name: storedTool.name,
        description: storedTool.description,
        parameters: {
          type: 'object',
          properties: storedTool.parameters.properties,
          required: Object.keys(storedTool.parameters.properties),
          additionalProperties: false,
        },
        execute: this.actionsService.getActionHandler(type),
      }),
    );
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
      actions: agent.actions,
    };
  }

  async updateInstructions(
    agentId: string,
    { instructions }: UpdateAgentInstructionsDto,
  ): Promise<AgentsAPI.PatchInstructions.Response> {
    const updateObject = { instructions };

    const actionsFound = await this.detectRequiredActions(instructions);

    if (actionsFound.length) {
      updateObject['actions'] = actionsFound;
    }

    const agent = await this.agentModel
      .findOneAndUpdate({ agentId }, updateObject, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return {
      agentId: agent.agentId,
      instructions: agent.instructions,
      actions: agent.actions,
    };
  }

  async updateActionStatus(
    status: AgentActionTemplateStatus,
    actionId: Types.ObjectId,
    agentId: string,
  ): Promise<AgentsAPI.PatchActionStatus.Response> {
    await this.agentModel.updateOne(
      { agentId, 'actions._id': actionId },
      { $set: { 'actions.$.status': status as string } },
    );

    return {
      message: 'Action status updated successfully',
      actionId: actionId.toString(),
      status,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
