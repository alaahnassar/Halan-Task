import { Injectable } from '@angular/core';
import { Observable, catchError, empty, expand, map, reduce } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<any[]>(url);
  }
  searchUsers(query: string): Observable<any[]> {
    const url = `${this.apiUrl}/search/users?q=${query}`;
    return this.http
      .get<any[]>(url)
      .pipe(map((response: any) => response.items as any[]));
  }
}
