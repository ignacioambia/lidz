import { AgentActionTemplate } from "../agent-action-template";

export namespace GetByIdNamespace {
    export type Response = {
        instructions: string;
        updatedAt: string;
        createdAt: string;
        actions: AgentActionTemplate[];
    }
}