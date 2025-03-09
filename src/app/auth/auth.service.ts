import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../shared/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  loadUser() {
    this.http
      .get<User>(`${environment.apiUrl}/user`, { withCredentials: true })
      .subscribe((user) => {
        this.userSubject.next(user);
        this.router.navigate(['/']);
      });
  }

  login(username: string, password: string) {
    this.http
      .post<User>(
        `${environment.apiUrl}/auth/login`,
        { username, password },
        {
          withCredentials: true
        }
      )
      .subscribe((user) => {
        this.userSubject.next(user);
        this.router.navigate(['/']);
      });
  }

  updateUser(user: Partial<User>) {
    this.http
      .patch<User>(`${environment.apiUrl}/user`, user, {
        withCredentials: true
      })
      .subscribe((updatedUser) => {
        this.userSubject.next(updatedUser);
      });
  }

  register(username: string, password: string) {
    this.http
      .post<User>(
        `${environment.apiUrl}/auth/register`,
        { username, password },
        {
          withCredentials: true
        }
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => Boolean(user)),
      catchError(() => of(false))
    );
  }

  logout() {
    this.http
      .get(`${environment.apiUrl}/auth/logout`, { withCredentials: true })
      .subscribe(() => {
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      });
  }

  deleteAccount() {
    this.http
      .delete(`${environment.apiUrl}/user`, { withCredentials: true })
      .subscribe(() => {
        this.userSubject.next(null);
        this.router.navigate(['/login']);
      });
  }
}
