import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentsAPI } from '@lidz/shared';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  private http = inject(HttpClient);

  public createAgent(instructions: string): Observable<AgentsAPI.Post.Response> {
    // If no agentId, create a new agent
    const payload: AgentsAPI.Post.Request = { instructions };
    return this.http
      .post<AgentsAPI.Post.Response>('http://localhost:3000/agents', payload)
  }

  public updateInstructions(agentId: string, instructions: string): Observable<AgentsAPI.PatchInstructions.Response> {
    const payload: AgentsAPI.PatchInstructions.Request = { instructions };
    return this.http
      .patch<AgentsAPI.PatchInstructions.Response>(`http://localhost:3000/agents/${agentId}/instructions`, payload);
  }

  public getById(agentId: string): Observable<AgentsAPI.GetById.Response> {
    return this.http
      .get<AgentsAPI.GetById.Response>(`http://localhost:3000/agents/${agentId}`);
  }
}
