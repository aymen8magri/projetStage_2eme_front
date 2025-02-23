import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupplementaireService {

  constructor() { }

  private URL = 'http://localhost:3000/supplementaire';
  readonly http: HttpClient = inject(HttpClient);

  // add a new Supplementaire
  addSupplementaire(supplementaire: any) {
    return this.http.post(`${this.URL}/addSupplementaire`, supplementaire);
  }

  //get Supplementaire by type Supplementaire
  getSupplementaireByType(typeSupplementaire: String) {
    return this.http.get(`${this.URL}/getSupplementaireByType/${typeSupplementaire}`);
  }

  //delete Supplementaire by id
  deleteSupplementaire(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
