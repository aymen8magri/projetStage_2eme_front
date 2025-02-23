import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayementClientService {

  constructor() { }

  private URL = 'http://localhost:3000/payementclient';
  readonly http: HttpClient = inject(HttpClient);
  // add a new payementClient
  addPayementClient(payementClient: any) {
    return this.http.post(`${this.URL}/addPayementClient`, payementClient);
  }

  // display all PayementClient
  getAllPayementClient() {
    return this.http.get(`${this.URL}/getAllPayementClient`);
  }

  //get payementClient by ecompter
  getAllPayementClientEscompter() {
    return this.http.get(`${this.URL}/getAllPayementClientEscompter`);
  }

  // get payementClient by id ClientId
  getPayementClientByClientId(id: any) {
    return this.http.get(`${this.URL}/getClientPayement/${id}`);
  }
  //display PayementClient by id
  getPayementClientById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }
  //update PayementClient by id
  updatePayementClient(id: any, payementClient: any) {
    return this.http.put(`${this.URL}/${id}`, payementClient);
  }
  //delete PayementClient by id
  deletePayementClient(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }

}
