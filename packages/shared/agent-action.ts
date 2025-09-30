export interface AgentAction {
  type: "notification";
  status: "pending" | "confirmed" | "rejected";
  tool: {
    name: string;
    description: string;
    parameters: {
      [key: string]: string;
    };
  };
}
