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

interface SendWhatsappTemplate {
  phoneNumberId: string;
  to: string;
  templateName: string;
  components: unknown[];
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

  async sendTemplate(template: SendWhatsappTemplate) {
    await fetch(
      `https://graph.facebook.com/v22.0/${template.phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.configService.get('WHATSAPP_ACCESS_TOKEN')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: template.to,
          type: 'template',
          template: {
            name: template.templateName,
            language: {
              code: 'es',
            },
            //TODO: The parameters should be dynamic based on the template requirements
            components: template.components || [],
          },
        }),
      },
    );
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
