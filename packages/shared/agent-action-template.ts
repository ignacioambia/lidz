export type AgentActionTemplateStatus = 'pending' | 'confirmed' | 'rejected';

export interface AgentActionTemplate {
  _id: string;
  type: "notification";
  status: AgentActionTemplateStatus;
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
