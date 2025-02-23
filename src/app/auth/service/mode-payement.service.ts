import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModePayementService {

  constructor() { }

  private URL = 'http://localhost:3000/modepayement';
  readonly http: HttpClient = inject(HttpClient);

  // add a new ModePayement
  addModePayement(modePayement: any) {
    return this.http.post(`${this.URL}/addModePayement`, modePayement);
  }

  //display all ModePayement
  getAllModePayements() {
    return this.http.get(`${this.URL}/getAllModePayement`);
  }

  //display ModePayement by id
  getModePayementById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }

  //update ModePayement by id
  updateModePayement(id: any, modePayement: any) {
    return this.http.put(`${this.URL}/${id}`, modePayement);
  }

  //delete ModePayement by id
  deleteModePayement(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
