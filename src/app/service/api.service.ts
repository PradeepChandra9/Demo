import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://testnode.propelapps.com/EBS/20D/login';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json', });
    const body = { username, password };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  public getOrganizations(DEFAULT_INV_ORG_NAME: string): Observable<any> {
    const headers = new HttpHeaders().set('DEFAULT_INV_ORG_NAME', DEFAULT_INV_ORG_NAME);
    return this.http.get<any>(this.apiUrl, { headers });
  }

}
