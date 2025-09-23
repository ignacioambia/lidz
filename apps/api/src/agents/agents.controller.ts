import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgentsAPI } from '@lidz/shared';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentInstructionsDto } from './dto/update-agent-instructions.dto';
import { Types } from 'mongoose';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  create(
    @Body() createAgentDto: CreateAgentDto,
  ): Promise<AgentsAPI.Post.Response> {
    //TODO: This value must be removed and replaced with the actual provider id when the authentication system is implemented
    const providerId = new Types.ObjectId('64f9c0e8f1d3c2b1a1a1a1a1');
    return this.agentsService.create(createAgentDto, providerId);
  }

  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(+id);
  }

  @Patch(':agentId/instructions')
  updateInstructions(
    @Param('agentId') agentId: string,
    @Body() updateAgentDto: UpdateAgentInstructionsDto,
  ): Promise<AgentsAPI.PatchInstructions.Response> {
    return this.agentsService.updateInstructions(agentId, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }
}
