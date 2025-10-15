export interface AgentAction {
  id: string;
  type: "notification";
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
