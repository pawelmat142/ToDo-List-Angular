import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<void>()
  @Output() logoutEvent = new EventEmitter<void>()
  @Output() manualEvent = new EventEmitter<void>()
  @Output() addTaskEvent = new EventEmitter<void>()

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
  }

  showNotDone(): void {
    this.tasksService.filter = 'notDone'
    this.closeEvent.emit()
  }
  
  showDone(): void {
    this.tasksService.filter = 'done'
    this.closeEvent.emit()
  }
  
  showAll(): void {
    this.tasksService.filter = 'all'
    this.closeEvent.emit()
  }
  
  async deleteAll() {
    if (this.tasksService.length) {
      let deleted = await this.tasksService.deleteAll()
      if (deleted) {
        this.closeEvent.emit()
      }
    } else { 
      this.closeEvent.emit()
    }
  }
  
  async deleteAllDone() {
    if (this.tasksService.length) {
      let deleted = await this.tasksService.deleteAllDone()
      if (deleted) {
        this.closeEvent.emit()
      }
    } else { 
      this.closeEvent.emit()
    }
  }

}
