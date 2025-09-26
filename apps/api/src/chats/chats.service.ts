import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent, AgentInputItem, run } from '@openai/agents';
import { TwilioWebhookBody } from 'src/app.controller';
import {
  Conversation,
  ConversationDocument,
} from '../schemas/conversation.schema';
import { AgentsService } from 'src/agents/agents.service';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ChatsService {
  private formattingInstructions = readFileSync(
    join(__dirname, '/formatting-instructions.md'),
    'utf-8',
  );

  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    private agentsService: AgentsService,
  ) {}

  async processMessage(message: TwilioWebhookBody): Promise<string> {
    const userId = message.From;
    const agentId = message.To;

    const agentData = await this.agentsService.findOne(agentId);
    if (!agentData) {
      throw new Error('Agent not found');
    }

    const agent = new Agent({
      //TODO: Replace with dynamic name, Name functionality to be added in the future
      name: 'WhatsApp Assistant',
      instructions: `${agentData.instructions}\n\n${this.formattingInstructions}`,
    });

    // Get conversation history from database
    const conversationHistory = await this.getConversationHistory(
      userId,
      agentId,
    );

    const newMessage: AgentInputItem = { content: message.Body, role: 'user' };
    // Process with AI agent
    const result = await run(agent, [...conversationHistory, newMessage]);

    // Save both user message and bot response to database
    void this.saveMessage(agentId, userId, newMessage);

    const lastMessage = result.history[result.history.length - 1];
    void this.saveMessage(agentId, userId, lastMessage);

    const botResponse = result.finalOutput || '';
    return botResponse;
  }

  private async getConversationHistory(
    userId: string,
    assistantId: string,
  ): Promise<AgentInputItem[]> {
    // Find existing conversation
    const conversation = await this.conversationModel.findOne({
      assistantId,
      userId,
    });

    if (!conversation) {
      const newConversation = await this.conversationModel.create({
        assistantId: assistantId,
        userId: userId,
      });
      return newConversation.messages;
    }
    // Convert messages to AgentInputItem format
    return conversation.messages;
  }

  private async saveMessage(
    assistantId: string,
    userId: string,
    newMessage: AgentInputItem,
  ): Promise<void> {
    try {
      // Find or create conversation
      await this.conversationModel.updateOne(
        { assistantId, userId },
        {
          $push: { messages: newMessage },
        },
      );
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }
}
