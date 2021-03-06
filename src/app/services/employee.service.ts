import { environment } from './../../environments/environment';
import { EmployeeForDetails } from './../Models/EmployeeForDetails';
import { EmployeeForList } from './../Models/EmployeeForList';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { PaginatedData } from '../Models/pagination';
import { FilterParams } from '../Models/FilterParams';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.apiUrl;
  employees: EmployeeForList[];

constructor(private http: HttpClient) { }

getEmployees(page?: number, itemsPerPage?: number, filterParams?: FilterParams): Observable<PaginatedData<EmployeeForList[]>> {
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page.toString());
    params = params.append('pageSize', itemsPerPage.toString());
  }

  if (filterParams != null) {
    if (filterParams.lastNameFilter !== '') {
      params = params.append('lastNameFilter', filterParams.lastNameFilter);
    }

    if (filterParams.taxNumberFilter !== '') {
      params = params.append('taxNumberFilter', filterParams.taxNumberFilter);
    }

    if (filterParams.workingPositionFilter !== '') {
      params = params.append('workingPositionFilter', filterParams.workingPositionFilter);
    }
  }

  const paginatedData: PaginatedData<EmployeeForList[]> = new PaginatedData<EmployeeForList[]>();

  return this.http.get<EmployeeForList[]>(this.baseUrl + 'employees', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedData.result = response.body;

          if (response.headers.get('Pagination') != null) {
           paginatedData.pagination = JSON.parse(response.headers.get('Pagination'));
         }

          return paginatedData;
        })
      );
}

deleteEmployee(id: number) {
  return this.http.delete(this.baseUrl + 'employees/' + id);
}

addEmployee(newEmployee: EmployeeForDetails) {
  return this.http.post(this.baseUrl + 'employees', newEmployee);
}

getEmployee(id: number) {
  return this.http.get(this.baseUrl + 'employees/' + id);
}

updateEmployee(id: number, employeeToUpdate: EmployeeForDetails) {
  return this.http.put(this.baseUrl + 'employees/' + id, employeeToUpdate);
}
}
