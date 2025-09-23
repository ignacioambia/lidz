import { AgentsAPI, Exact } from '@lidz/shared';
import { IsString } from 'class-validator';

export class CreateAgentDto
  implements Exact<AgentsAPI.Post.Request, CreateAgentDto>
{
  @IsString()
  instructions: string;
}
