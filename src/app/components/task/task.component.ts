import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from '../../models/task'


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: Task;

  @Input() index: number;

  constructor(private tasksService: TasksService) { }

  deleteTask(): void {
    this.tasksService.deleteTask(this.task.id)
  }
}
