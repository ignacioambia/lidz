import { GetByIdNamespace } from './get-by-id';
import { PatchInstructionsNamespace } from './patch-instructions';
import { PostNamespace } from './post';
import { PatchActionStatusNamespace } from './patch-action-status';

export namespace AgentsAPI {
    export import Post = PostNamespace;
    export import PatchInstructions = PatchInstructionsNamespace;
    export import GetById = GetByIdNamespace;
    export import PatchActionStatus = PatchActionStatusNamespace;
}