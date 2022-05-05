import { Component, Input, Output, EventEmitter} from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from '../../models/task'
import { Subtask } from '../../models/subtask'


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() task: Task
  @Input() index: number

  @Output() deleteEvent = new EventEmitter<void>()
  @Output() editEvent = new EventEmitter<void>()

  constructor(private tasksService: TasksService) { }

  visible: boolean = false
  showClass: boolean = false
  taskNameLimit: number = 40

  subtasks: Array<Subtask> = null
  

  onClick(): void {
    if (this.visible) this.hide()
    else this.show()
  }


  async deleteTask() {
    let deleted = await this.tasksService
      .deleteTask(this.task.id)
    if (deleted) this.deleteEvent.emit()
  }
  

  async markAsDone() {
    let marked = await this.tasksService
      .markAsDone(this.task.id, !this.task.done)
    if (marked) this.task.done = !this.task.done
  }


  async markSubtaskAsDone(i: number) {
    if (this.subtasks[i]) {
      let subtasks = JSON.parse(JSON.stringify(this.subtasks))
      subtasks[i].done = !subtasks[i].done
      let marked = await this.tasksService
        .updateSubtasks(this.task.id, JSON.stringify(subtasks))
      if (marked) { 
        this.subtasks[i].done = !this.subtasks[i].done
        this.task.subtasks = JSON.stringify(subtasks)
      }
    }
  }


  editTask(): void {
    this.tasksService.editTaskId = this.task.id
    this.editEvent.emit()
  }


  private show(): void {
    if (this.task.subtasks) { 
      this.subtasks = JSON.parse(this.task.subtasks) as Array<Subtask>
    }
    this.visible = true
    setTimeout(() => this.showClass = true, 10)
    let increment = setInterval(() => { 
      this.taskNameLimit++
      if (this.taskNameLimit > this.task.name.length) { 
        clearInterval(increment)
      }
    }, 10)
  }
  

  private hide(): void {
    this.showClass = false
    setTimeout(() => this.visible = false, 300)
    let decrement = setInterval(() => { 
      this.taskNameLimit--
      if (this.taskNameLimit <= 40) { 
        clearInterval(decrement)
      }
    }, 10)
  }


}
