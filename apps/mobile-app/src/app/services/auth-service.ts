import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserAuthenticated(): boolean {
    // Implement your authentication logic here
    return true; // Placeholder implementation
  }
}
