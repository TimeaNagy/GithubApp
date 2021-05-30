import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private githubUrl: string = 'https://api.github.com';

  constructor(private http: HttpClient) { 
  }

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

  getAccessToken(code: string): Observable<any> {
    return this.http.post('/oauth/getAccessToken', {code: code});
  }

  getCurrentUser(accessToken: string): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'token ' + accessToken);
    return this.http.get(this.githubUrl + '/user',  { headers })
  }

  // getIssues(accessToken: string, perPage: number, page: number): Observable<any> {
  //   let headers = new HttpHeaders().append('Authorization', 'token ' + accessToken);
  //   let params = new HttpParams().append('filter', 'all');
  //   // params = params.append('page', page);
  //   // params = params.append('per_page', perPage);
  //   return this.http.get(this.githubUrl + '/issues',  { headers, params })
  // }
}
