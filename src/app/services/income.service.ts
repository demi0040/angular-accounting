import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private _http: HttpClient) { }

  addIncome(income: any): Observable<any> {
    return this._http.post('http://localhost:3000/incomes', income);
  }

  updateIncome(id: number, income: any): Observable<any> {
    return this._http.put(`http://localhost:3000/incomes/${id}`, income);
  }

  getIncomes(): Observable<any> {
    return this._http.get('http://localhost:3000/incomes');
  }

  deleteIncome(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/incomes/${id}`);
  }
}
