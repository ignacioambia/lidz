import { Exact } from '@lidz/shared';
import { AgentsAPI } from '@lidz/shared/dist/agents';
import { IsString } from 'class-validator';

export class UpdateAgentInstructionsDto
  implements
    Exact<AgentsAPI.PatchInstructions.Request, UpdateAgentInstructionsDto>
{
  @IsString()
  instructions: string;
}
