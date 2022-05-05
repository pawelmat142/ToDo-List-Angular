import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task'



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: Task;
  @Input() i: number;
  @Output() deleteEvent = new EventEmitter<number>()
  
  constructor() { 
  }



}
