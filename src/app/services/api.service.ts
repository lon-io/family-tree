import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  // Url for the server. Note that the server allows Cross Origin scripts from this url
  api_url = environment.apiBaseUrl;

  constructor(private http: Http) { }

  // Http call to get all nodes
  getPersons(): Observable<any> {
    return this.http.get(`${this.api_url}/persons`).map(res => res.json());
  }

  // Http call to create a node
  addPerson(person): Observable<any> {
    return this.http.post(`${this.api_url}/person`, JSON.stringify(person), this.options).map(res => res.json());
  }

  // Http call to update a node
  editPerson(person): Observable<any> {
    return this.http.put(`${this.api_url}/person/${person._id}`, JSON.stringify(person), this.options);
  }

  // Http call to delete  a node - unused
  deletePerson(person): Observable<any> {
    return this.http.delete(`${this.api_url}/person/${person._id}`, this.options);
  }

  // Http call to delete a node and its (direct or indirect) children nodes
  deletePersons(person, nodes): Observable<any> {
    return this.http.delete(`${this.api_url}/persons/${person._id}/${nodes}`, this.options);
  }

}
