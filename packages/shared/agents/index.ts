import { PatchInstructionsNamespace } from './patch-instructions';
import { PostNamespace } from './post';

export namespace AgentsAPI {
    export import Post = PostNamespace;
    export import PatchInstructions = PatchInstructionsNamespace;
}