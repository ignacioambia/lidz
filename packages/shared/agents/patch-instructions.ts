export namespace PatchInstructionsNamespace {
    export type Request = {
        instructions: string;
    }

    export type Response = {
        agentId: string;
        message: string;
    }
}