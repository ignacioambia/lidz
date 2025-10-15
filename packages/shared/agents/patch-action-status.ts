import { AgentAction, AgentActionStatus } from "../agent-action-template";

export namespace PatchActionStatusNamespace {
    export type Request = {
        status: AgentActionStatus;
    }

    export type Response = {
        message: string;
        actionId: string;
        status: AgentActionStatus;
    };
}