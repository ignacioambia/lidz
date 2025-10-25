import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  isUserAuthenticated() {
    return true;
    // return this.http.post('/auth/send-wa-code', );
    // Implement your authentication logic here
  }

  sendWaCode(phoneNumber: string): Observable<any> {
    return this.http.post('/auth/send-wa-code', { phoneNumber });
  }
}
