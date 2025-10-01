export type AgentActionStatus = 'pending' | 'confirmed' | 'rejected';

export interface AgentAction {
  _id: string;
  type: "notification";
  status: AgentActionStatus;
  tool: {
    name: string;
    description: string;
    parameters: {
      type: 'object';
      properties: {
        [key: string]: {
          type: 'string';
          description: string;
        };
      }
    };
  };
}
