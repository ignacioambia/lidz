import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);

  getProfile() {
    return this.http.get<{ phoneNumber: string }>('/customers/profile');
  }
}
