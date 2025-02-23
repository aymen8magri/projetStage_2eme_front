import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayementFournissseurService {

  constructor() { }
  private URL = 'http://localhost:3000/payementfournisseur';
  readonly http: HttpClient = inject(HttpClient);
  // add a new PayementFournisseur
  addPayementFournisseur(PayementFournisseur: any) {
    return this.http.post(`${this.URL}/addPayementFournisseur`, PayementFournisseur);
  }

  // display all PayementFournisseur
  getAllPayementFournisseur() {
    return this.http.get(`${this.URL}/getAllPayementFournisseur`);
  }

  // get PayementFournisseur by id ClientId
  getPayementFournisseurByFournisseurId(id: any) {
    return this.http.get(`${this.URL}/getFournisseurPayement/${id}`);
  }
  //display PayementFournisseur by id
  getPayementFournisseurById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }
  //update PayementFournisseur by id
  updatePayementFournisseur(id: any, PayementFournisseur: any) {
    return this.http.put(`${this.URL}/${id}`, PayementFournisseur);
  }
  //delete PayementFournisseur by id
  deletePayementFournisseur(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
