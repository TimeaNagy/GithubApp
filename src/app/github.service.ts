import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

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

}
