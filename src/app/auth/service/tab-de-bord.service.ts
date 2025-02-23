import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabDeBordService {

  constructor() { }


  private URL = 'http://localhost:3000/tableauDeBord';
  readonly http: HttpClient = inject(HttpClient);

  // add + edit tab de bord
  addEditTabDeBord(tabDeBord: any) {
    return this.http.post(`${this.URL}/addEditTabDeBord`, tabDeBord);
  }
  // get tab de bord by mois and anne and banque
  getTabDeBordByMoisAndAnneAndBanque(mois: any, annee: any, banqueId: any) {
    return this.http.get(`${this.URL}/getTabDeBordByMoisAnneeBanque/${mois}/${annee}/${banqueId}`);
  }

  // get all the tab de bord
  getAllTabDeBord() {
    return this.http.get(`${this.URL}/getAllTabDeBord`);
  }

  //get Tab De Bord By Mois Annee
  getTabDeBordByMoisAnnee(mois: any, annee: any) {
    return this.http.get(`${this.URL}/getTabDeBordByMoisAnnee/${mois}/${annee}`);
  }
}