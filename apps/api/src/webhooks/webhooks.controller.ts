import {
  Controller,
  Get,
  Post,
  Body,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('whatsapp')
  create(@Body() body: any) {
    const messageFrom = body?.entry?.[0]?.changes?.[0]?.value.contacts?.[0]
      ?.wa_id as string;
    if (messageFrom) {
      const receivedMsg = body?.entry?.[0]?.changes?.[0]?.value.messages?.[0]
        ?.text?.body as string;
      const phoneNumberId = body?.entry?.[0]?.changes?.[0]?.value?.metadata
        ?.phone_number_id as string;

      this.whatsappService.handleReceivedMessage({
        from: messageFrom,
        body: receivedMsg,
        phoneNumberId: phoneNumberId,
      });
    }
  }

  @Get('whatsapp')
  findAll(
    @Query('hub.challenge') challenge: string,
    @Query('hub.mode') mode: string,
  ) {
    if (mode === 'subscribe' && challenge) {
      return challenge;
    }
    throw new ForbiddenException();
    // return this.webhooksService.findAll();
  }
}
