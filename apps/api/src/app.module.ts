import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsService } from './chats/chats.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationSchema,
} from './schemas/conversation.schema';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    AgentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatsService],
})
export class AppModule {}
