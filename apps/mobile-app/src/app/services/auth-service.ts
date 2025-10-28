import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  sendWaCode(phoneNumber: string): Observable<any> {
    return this.http.post('/auth/send-wa-code', { phoneNumber });
  }

  verifyWACode(phoneNumber: string, code: string): Observable<any> {
    return this.http.post('/auth/verify-wa-code', { phoneNumber, code });
  }
}
