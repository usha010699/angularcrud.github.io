import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../modules/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  baseurl="http://localhost:5206/api/Employee";

  constructor(private hc :HttpClient) { }

  GetEmployee():Observable<Employee[]>
  {
    return this.hc.get<Employee[]>(this.baseurl);
  }

  createEmployee(emp:Employee):Observable<Employee>
  {
    emp.id="00000000-0000-0000-0000-000000000000";
    return this.hc.post<Employee>(this.baseurl,emp);
  }
  updateEmployee(emp:Employee):Observable<Employee>
  {
    
    return this.hc.put<Employee>(this.baseurl+'/'+emp.id,emp);
  }
  DeleteEmployee(id:string):Observable<Employee>
  {
    return this.hc.delete<Employee>(this.baseurl+'/'+id);
  }

}
