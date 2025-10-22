import { AgentActionTemplateStatus } from "../agent-action-template";

export namespace PatchActionStatusNamespace {
    export type Request = {
        status: AgentActionTemplateStatus;
    }

    export type Response = {
        message: string;
        actionId: string;
        status: AgentActionTemplateStatus;
    };
}