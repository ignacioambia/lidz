import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatsService } from './chats/chats.service';

//TODO: As we are moving to using the whatsapp api directly, this things might change and might not be required anymore
export interface TwilioWebhookBody {
  MessageSid: string;
  AccountSid: string;
  From: string;
  To: string;
  Body: string;
  NumMedia: string;
  ProfileName?: string;
  WaId: string;
  // ... other fields
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly chatsService: ChatsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('wa-message')
  async processWhatsAppMessage(
    @Body() messageDto: TwilioWebhookBody,
  ): Promise<any> {
    console.log('Received WhatsApp message:', messageDto);
    const response = await this.chatsService.processMessage(messageDto);
    return `<Response><Message>${response}</Message></Response>`;
  }

  @Get('wa-message-status')
  getWhatsAppMessageStatus(@Body() messageBody: any): string {
    console.log('WhatsApp message status endpoint hit', messageBody);
    return 'Message status';
  }

  @Get('waba')
  handleWABAEvent(@Body() eventBody: any): string {
    console.log('Received WABA event:', eventBody);
    return 'WABA event received';
  }
  @Post('waba')
  handlePostWABAEvent(@Body() eventBody: any): string {
    console.log('Received WABA event:', eventBody);
    return 'WABA event received';
  }
}
