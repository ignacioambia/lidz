export type AgentActionType = 'notification';
export interface AgentAction {
  id: string;
  type: AgentActionType;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    phoneNumber: string;
  };
  parameters: {
    [key: string]: string;
  };
}
