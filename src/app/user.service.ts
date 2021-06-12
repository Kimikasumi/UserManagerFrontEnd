import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentTypee } from './models/documentType.model';
import { City } from './models/city.model';
import { User } from './models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  configUrl='http://127.0.0.1:8000/polls/';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<DocumentTypee[]> {
    return this.http.get<DocumentTypee[]>(this.configUrl+"documents/");
  }
  
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.configUrl+"city/");
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.configUrl+"users/");
  }

  saveUser(user:User): Observable<string> {
    return this.http.post<string>(this.configUrl+"users/create/",user);
  }

  updateUser(userId: number, u: User): Observable<string> {
    return this.http.put<string>(this.configUrl+userId+"/users/edit/",u);
  }

  deleteUser(userId:number):Observable<string> {
    return this.http.delete<string>(this.configUrl+userId+"/users/delete/");
  }
}
