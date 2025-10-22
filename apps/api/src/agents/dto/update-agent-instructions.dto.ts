import { Exact } from '@lidz/shared';
import { AgentsAPI } from '@lidz/shared';
import { IsString } from 'class-validator';

export class UpdateAgentInstructionsDto
  implements
    Exact<AgentsAPI.PatchInstructions.Request, UpdateAgentInstructionsDto>
{
  @IsString()
  instructions: string;
}
