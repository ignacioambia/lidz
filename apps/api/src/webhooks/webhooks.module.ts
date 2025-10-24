import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';

@Module({
  controllers: [WebhooksController],
  imports: [WhatsappModule],
})
export class WebhooksModule {}
