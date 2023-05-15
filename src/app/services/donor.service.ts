import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorService {

  constructor(private _http: HttpClient) { }

  addDonor(donor: any): Observable<any> {
    return this._http.post('http://localhost:3000/donors', donor);
  }

  updateDonor(id: number, donor: any): Observable<any> {
    return this._http.put(`http://localhost:3000/donors/${id}`, donor);
  }

  getDonors(): Observable<any> {
    return this._http.get('http://localhost:3000/donors');
  }

  deleteDonor(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/donors/${id}`);
  }
}
