import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface ReceivedWhatsappMessage {
  from: string;
  body: string;
  phoneNumberId: string;
}

interface SendWhatsappMessage {
  to: string;
  body: string;
  fromPhoneNumberId: string;
}

@Injectable()
export class WhatsappService {
  constructor(private configService: ConfigService) {}

  async handleReceivedMessage(receivedMessage: ReceivedWhatsappMessage) {
    await this.sendMessage({
      to: receivedMessage.from,
      body: `Mensaje recibido: *${receivedMessage.body}*`,
      fromPhoneNumberId: receivedMessage.phoneNumberId,
    });
  }

  async sendMessage(message: SendWhatsappMessage) {
    await fetch(
      `https://graph.facebook.com/v17.0/${message.fromPhoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.configService.get('WHATSAPP_ACCESS_TOKEN')}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: message.to,
          type: 'text',
          text: {
            preview_url: true,
            body: message.body,
          },
        }),
      },
    );
  }
}
