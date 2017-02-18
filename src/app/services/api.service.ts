import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  api_url = 'http://localhost:3000'

  constructor(private http: Http) { }

  getPersons(): Observable<any> {
    return this.http.get(`${this.api_url}/persons`).map(res => res.json());
  }

  addPerson(person): Observable<any> {
    return this.http.post(`${this.api_url}/person`, JSON.stringify(person), this.options).map(res => res.json());
  }

  editPerson(person): Observable<any> {
    return this.http.put(`${this.api_url}/person/${person._id}`, JSON.stringify(person), this.options);
  }

  deletePerson(person): Observable<any> {
    return this.http.delete(`${this.api_url}/person/${person._id}`, this.options);
  }

  deletePersons(person, nodes): Observable<any> {
    return this.http.delete(`${this.api_url}/persons/${person._id}/${nodes}`, this.options);
  }

}
