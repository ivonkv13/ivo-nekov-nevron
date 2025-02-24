import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  Observable,
  throwError,
} from 'rxjs';
import { ClearNumbersResponse, GenerateNumbersResponse, GetNumbersResponse, SumNumbersResponse } from '../../models/app-models';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private baseUrl = 'https://localhost:32773/api/Calculator';

  constructor(private http: HttpClient) {}

  getNumbers(): Observable<GetNumbersResponse> {
    const url = `${this.baseUrl}/GetNumbers`;
    return this.http.get<GetNumbersResponse>(url, { withCredentials: true}).pipe(
      catchError((error) => {
        console.error('Error fetching numbers:', error);
        return throwError(() => new Error('Failed to fetch numbers'));
      })
    );
  }

  generateNumber(): Observable<GenerateNumbersResponse> {
    const url = `${this.baseUrl}/GenerateNumber`;
    return this.http.get<GenerateNumbersResponse>(url, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error fetching numbers:', error);
        return throwError(() => new Error('Failed to fetch numbers'));
      })
    );
  }

  clearNumbers(): Observable<ClearNumbersResponse> {
    const url = `${this.baseUrl}/Clear`;

    return this.http.get<ClearNumbersResponse>(url, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error fetching numbers:', error);
        return throwError(() => new Error('Failed to fetch numbers'));
      })
    );
  }

  sumNumbers(): Observable<SumNumbersResponse> {
    const url = `${this.baseUrl}/Sum`;

    return this.http.get<SumNumbersResponse>(url, { withCredentials: true}).pipe(
      catchError((error) => {
        console.error('Error fetching numbers:', error);
        return throwError(() => new Error('Failed to fetch numbers'));
      })
    );
  }
}
