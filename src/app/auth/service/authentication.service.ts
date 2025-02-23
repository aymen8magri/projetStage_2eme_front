import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private URL = 'http://localhost:3000/users';

  //registre user
  register(user: any) {
    return this._http.post(`${this.URL}/register`, user);
  }

  //user login
  login(user: any) {
    return this._http.post(`${this.URL}/login`, user);
  }

  //user logout
  logout() {
    localStorage.removeItem('token');
  }

  //get user by id
  getUserById(id: any) {
    return this._http.get(`${this.URL}/${id}`);
  }

  //get user id from token
  getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.userId;
    }
    return null;
  }
}
