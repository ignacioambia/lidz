import { AgentActionTemplateStatus, AgentsAPI, Exact } from '@lidz/shared';
import { IsEnum } from 'class-validator';

export class UpdateAgentActionStatusDto
  implements
    Exact<AgentsAPI.PatchActionStatus.Request, UpdateAgentActionStatusDto>
{
  @IsEnum(['pending', 'confirmed', 'rejected'])
  status: AgentActionTemplateStatus;
}
