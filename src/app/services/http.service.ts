import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { RegisterForm } from '../models/registerForm';
import { User } from '../models/user';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://localhost:3333'

  private headers = new HttpHeaders({ 'Authorization': '' })

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token')
    if (token) this.setTokenHeader(token)
  }
  
  
  register(body: RegisterForm): Observable<never> {
    return this.http.post<never>(this.url + '/register', body)
  }


  login(body: Partial<User>): Observable<string> {
    return this.http.post<string>(this.url + '/login', body)
      .pipe(tap(token => { 
        this.setTokenHeader(token)
        localStorage.setItem('token', token)
      }))
  }

    
  tasks(): Observable<Task[]> { 
    return this.http.get<Task[]>(this.url + '/tasks', {headers: this.headers})
  }


  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.url + '/task', task, { headers: this.headers })
  }


  deleteTask(i: number): Observable<void> {
    const params = new HttpParams().set('_id', i)
    return this.http.delete<void>(this.url + '/delete', {
      params: params,
      headers: this.headers
    })
  }


  private setTokenHeader(token: string) { 
    this.headers = this.headers.set('Authorization', 'Bearer ' + token)
  }

}
