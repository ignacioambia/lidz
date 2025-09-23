import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from '../schemas/agent.schema';

@Module({
  controllers: [AgentsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Agent.name,
        schema: AgentSchema,
      },
    ]),
  ],
  providers: [AgentsService],
})
export class AgentsModule {}
