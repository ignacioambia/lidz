import { AgentAction } from "../agent-action";

export namespace GetByIdNamespace {
    export type Response = {
        instructions: string;
        updatedAt: string;
        createdAt: string;
        actions: AgentAction[];
    }
}