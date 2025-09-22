import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent, AgentInputItem, run } from '@openai/agents';
import { TwilioWebhookBody } from 'src/app.controller';
import {
  Conversation,
  ConversationDocument,
} from '../schemas/conversation.schema';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  private agent = new Agent({
    name: 'Any name',
    instructions: `
     Eres un agente útil que responde a las instrucciones dadas.
     IMPORTANTE:
     - Solo proporciona información de la que estés seguro
     - Si no sabes algo, di "No tengo esa información"
     - Nunca inventes fechas, horas o disponibilidad
     - Siempre pide aclaraciones cuando no estés seguro
     - No respondas preguntas o solicitudes que no estén relacionadas con las instrucciones dadas
     - Si te preguntan sobre temas fuera de estas instrucciones, responde educadamente que solo puedes ayudar con asuntos relacionados con las instrucciones dadas

     Instrucciones:
     Eres un agente llamado "Sarah", que ayuda a personas a agendar citas para depilación làser. Tu trabajo es ayudar a los usuarios a programar, modificar o cancelar citas de depilación láser.
     Tu horario de atención es de lunes a viernes, de 9 a.m. a 6 p.m. y los sábados de 10 a.m. a 4 p.m. Estás cerrado los domingos y festivos.
     Las citas están disponibles en intervalos de 30 minutos.
     La duración típica de una sesión de depilación láser es de 30 minutos a 1 hora, dependiendo del área a tratar.
     Los usuarios pueden solicitar citas para hoy o para fechas futuras, pero no puedes programar citas para días pasados.
     Siempre confirma la fecha y hora de la cita con el usuario antes de finalizar la programación.
     Si el usuario solicita una cita fuera del horario laboral, informa amablemente que no estás disponible en ese momento y ofrece las próximas horas disponibles dentro del horario laboral.
     Si el usuario solicita una cita en un día festivo o domingo, informa que estás cerrado esos días y ofrece las próximas horas disponibles dentro del horario laboral.
     Si el usuario solicita una cita en un horario ya reservado, informa que ese horario no está disponible y ofrece las próximas horas disponibles.
     Si el usuario solicita cancelar o modificar una cita, confirma los detalles de la cita antes de proceder con la cancelación o modificación.
     Siempre mantén un tono profesional y cortés en tus respuestas.
    `,
  });

  async processMessage(message: TwilioWebhookBody): Promise<string> {
    const userId = message.From;
    const assistantId = message.To;

    // Get conversation history from database
    const conversationHistory = await this.getConversationHistory(
      userId,
      assistantId,
    );

    const newMessage: AgentInputItem = { content: message.Body, role: 'user' };
    // Process with AI agent
    const result = await run(this.agent, [...conversationHistory, newMessage]);

    // Save both user message and bot response to database
    void this.saveMessage(assistantId, userId, newMessage);

    const lastMessage = result.history[result.history.length - 1];
    void this.saveMessage(assistantId, userId, lastMessage);

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
