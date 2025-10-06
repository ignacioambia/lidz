import { AgentActionType } from '@lidz/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionsService {
  private readonly actionHandlers: Record<
    AgentActionType,
    (input: unknown) => void | Promise<void>
  > = {
    notification: (input) => this.handleNotification(input),
  };

  public getActionHandler(type: AgentActionType) {
    const handler = this.actionHandlers[type];
    if (!handler) {
      throw new Error(`Action handler for type "${type}" not found`);
    }
    return handler;
  }

  private handleNotification(input: unknown): void {
    console.log('Notification action executed with input:', input);
  }
}
