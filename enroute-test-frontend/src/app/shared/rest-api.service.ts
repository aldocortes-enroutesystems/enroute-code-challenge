import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { EmployeeTable } from '../shared/employee-table';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getEmployees(page: number = 1): Observable<EmployeeTable> {
    return this.http.get<EmployeeTable>(`${this.apiURL}/employeesExample?page=${page}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiURL}/employee/${id}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  handleError(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
