import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private githubUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getDevelopersByLocation(location: string, page: number, perPage: number, sort: string): Observable<any> {
    let params = new HttpParams().append('q', 'location:' + location);
    params = params.append('sort', sort);
    params = params.append('per_page', perPage);
    params = params.append('page', page);

    return this.http.get(this.githubUrl + '/search/users', { params })
  }

  getDeveloperByLogin(login: string): Observable<any> {
    return this.http.get(this.githubUrl + '/users/' + login)
  }

  getFollowersForDeveloper(login: string, perPage: number, page: number): Observable<any> {
    let params = new HttpParams().append('per_page', perPage);
    params = params.append('page', page);

    return this.http.get(this.githubUrl + '/users/' + login + '/followers',  { params })
  }

  getRepositoriesForDeveloper(login: string, perPage: number, page: number): Observable<any> {
    let params = new HttpParams().append('per_page', perPage);
    params = params.append('page', page);

    return this.http.get(this.githubUrl + '/users/' + login + '/repos',  { params })
  }

  getAccessToken(client_id: string, client_secrets: string, code: string): Observable<any> {
    // let headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Content-Type', 'application/json');
    let params = new HttpParams().append('client_id', client_id);
    params = params.append('client_secret', client_secrets);
    params = params.append('code', code);
    // console.log(headers)

    return this.http.post('https://github.com/login/oauth/access_token', null, {params});
  }
}
