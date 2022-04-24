import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from "./task";

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  private TASKS: Task[] = [
    {
      name: 'zadanie 0',
      deadline: new Date('Mar 30 2022'),
      done: false,
      order: 4,
    },
    {
      name: 'zadanie 1',
      deadline: new Date('Mar 5 2022'),
      done: false,
      order: 3,
    },
    {
      name: 'zadanie 2',
      deadline: new Date('Mar 4 2022'),
      done: false,
      order: 1,
    },
    {
      name: 'zadanie 3',
      deadline: new Date('Mar 3 2022'),
      done: false,
      order: 0,
    },
    {
      name: 'zadanie 4',
      deadline: new Date('Mar 1 2022'),
      done: false,
      order: 2,
    },
  ]


  fetchTasks(): Observable<Task[]> {
    return of(this.TASKS)
  }
  
  
  addTask(task: Task): void {
    this.TASKS.push(task)
  }
  
  
  deleteTask(i: number): void {
    this.TASKS.splice(i, 1)
  }
  

}
