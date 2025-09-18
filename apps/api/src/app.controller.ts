import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('wa-message')
  processWhatsAppMessage(@Body() messageDto: any): any {
    console.log('WhatsApp message endpoint hit', messageDto);
    return `<Response><Message>Message received: ${messageDto['Body']}</Message></Response>`;
  }

  @Get('wa-message-status')
  getWhatsAppMessageStatus(@Body() messageBody: any): string {
    console.log('WhatsApp message status endpoint hit', messageBody);
    return 'Message status';
  }
}
