import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Agent, AgentSchema } from '../schemas/agent.schema';
import { ActionsService } from 'src/actions/actions.service';

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
  providers: [AgentsService, ActionsService],
  exports: [AgentsService],
})
export class AgentsModule {}
