import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { User } from 'app/auth/models';

@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}

  private URL = 'http://localhost:3000/users';

  
  getUserById(id: any) {
    return this._http.get(`${this.URL}/${id}`);
  }

  editUser(id: any, user: any) {
    return this._http.put(`${this.URL}/${id}`, user);
  }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.userId;
    }
    return null;
  }
}
