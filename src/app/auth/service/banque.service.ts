import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {

  constructor() { }

  private URL = 'http://localhost:3000/banque';
  readonly http: HttpClient = inject(HttpClient);

  // add a new banque
  addBanque(banque: any) {
    return this.http.post(`${this.URL}/addBanque`, banque);
  }
  //display all banque
  getAllBanque() {
    return this.http.get(`${this.URL}/getAllBanque`);
  }
  //display banque by id
  getBanqueById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }
  //update banque by id
  updateBanque(id: any, banque: any) {
    return this.http.put(`${this.URL}/${id}`, banque);
  }
  //delete banque by id
  deleteBanque(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }

}
