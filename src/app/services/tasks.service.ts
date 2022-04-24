import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from "../models/task";
import { HttpService } from './http.service';
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  
  private tasks = new BehaviorSubject<Task[]>([])
  
  private redirectToLoginPage = new Subject<boolean>()
  _redirectToLoginPage = this.redirectToLoginPage.asObservable()
  
  constructor(private http: HttpService) { }
  

  loadTasks(): void {
    this.http.tasks().subscribe(
        (tasks) => this.tasks.next(tasks),
        (error) => this.handleError(error)
      )
  }


  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable()
  }


  addTask(task: Partial<Task>) {
    this.http.addTask(task).subscribe(
        () => this.loadTasks(),
        (error) => this.handleError(error)
      )
  }


  deleteTask(i: number): void {
    this.http.deleteTask(i).subscribe(
        () => this.loadTasks(),
        (error) => this.handleError(error)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403 || error.status === 401) { 
      this.redirectToLoginPage.next(null)
    }
    else console.error(error)
  }

}
