import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiersService {

  constructor() { }

  private URL = 'http://localhost:3000/tiers';
  readonly http: HttpClient = inject(HttpClient);

  //ajouter new tiers
  addTiers(tiers: any) {
    return this.http.post(`${this.URL}/addTiers`, tiers);
  }
  //get all tiers
  getAllTiers() {
    return this.http.get(`${this.URL}/getAllTiers`);
  }

  //get tiers by type
  getTiersByType(typeTiers: String) {
    return this.http.get(`${this.URL}/getTiersByType/${typeTiers}`);
  }
  //get tiers by id
  getTiersById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }

  //update tiers
  updateTiers(id: any, tiers: any) {
    return this.http.put(`${this.URL}/${id}`, tiers);
  }
  //delete tiers
  deleteTiers(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  //get tiers by type and moisCreation
  getTiersByTypeAndMoisCreation(typeTiers: String, moisCreation: number | string, anneeCreation: number | string) {
    // Conversion éventuelle en chaînes (si nécessaire)
    const mois = moisCreation.toString();
    const annee = anneeCreation.toString();
  
    return this.http.get(`${this.URL}/getTiersByTypeAndMoisCreation/${typeTiers}/${mois}/${annee}`);
  }
  
}
