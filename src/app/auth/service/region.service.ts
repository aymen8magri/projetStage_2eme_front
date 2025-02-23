import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor() { }

  private URL = 'http://localhost:3000/regions';
  readonly http: HttpClient = inject(HttpClient);
  // add a new Region
  addRegion(region: any) {
    return this.http.post(`${this.URL}/addRegion`, region);
  }

  //display all Region
  getAllRegions() {
    return this.http.get(`${this.URL}/getAllRegion`);
  }

  //display Region by id
  getRegionById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }

  //update Region by id
  updateRegion(id: any, region: any) {
    return this.http.put(`${this.URL}/${id}`, region);
  }

  //delete Region by id
  deleteRegion(id: any) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
