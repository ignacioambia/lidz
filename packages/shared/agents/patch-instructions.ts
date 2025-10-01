import { AgentAction } from "../agent-action";

export namespace PatchInstructionsNamespace {
    export type Request = {
        instructions: string;
    }

    export type Response = {
        agentId: string;
        instructions: string;
        actions: AgentAction[];
    };
}