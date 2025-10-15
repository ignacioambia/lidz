import { AgentActionType } from '@lidz/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionsService {
  private readonly actionHandlers: Record<
    AgentActionType,
    (input: unknown, context: unknown, details: unknown) => void | Promise<void>
  > = {
    notification: (input, context, details) =>
      this.handleNotification(input, context, details),
  };

  public getActionHandler(type: AgentActionType) {
    const handler = this.actionHandlers[type];
    if (!handler) {
      throw new Error(`Action handler for type "${type}" not found`);
    }
    return handler;
  }

  private handleNotification(
    input: unknown,
    context: unknown,
    details: unknown,
  ): void {
    console.log(
      'Notification action executed with input:',
      input,
      context,
      details,
    );
  }
}
