import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  constructor() { }
  private URL = 'http://localhost:3000/societe';
  readonly http: HttpClient = inject(HttpClient);

  // add a new Societe
  addSociete(societe: any) {
    return this.http.post(`${this.URL}/addSociete`, societe);
  }

  //display all Societe
  getAllSociete() {
    return this.http.get(`${this.URL}/getAllSociete`);
  }

  //display Societe by id
  getSocieteById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }

  //update Societe by id
  updateSociete(id: any, societe: any) {
    return this.http.put(`${this.URL}/${id}`, societe);
  }

  //delete Societe by id
  deleteSociete(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
