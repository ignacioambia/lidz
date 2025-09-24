import { GetByIdNamespace } from './get-by-id';
import { PatchInstructionsNamespace } from './patch-instructions';
import { PostNamespace } from './post';

export namespace AgentsAPI {
    export import Post = PostNamespace;
    export import PatchInstructions = PatchInstructionsNamespace;
    export import GetById = GetByIdNamespace;
}