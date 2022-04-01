import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adding-form',
  templateUrl: './adding-form.component.html',
  styleUrls: ['./adding-form.component.scss']
})
export class AddingFormComponent {

  newTask = {
    name: '',
    deadline: '',
  }

  @Output() readyEvent = new EventEmitter<boolean>()

  @Output() taskEvent = new EventEmitter<NewTask>()

  isReady(): boolean {
    return this.newTask.name !== '' && this.newTask.deadline !== ''
  }

  addTask(): void { 
    if (this.isReady()) { 
      this.taskEvent.emit(this.newTask)
      this.clearTask()
    }
  }

  clearTask(): void {
    this.newTask.name = ''
    this.newTask.deadline = ''
  }

  checkIfReady(): void {
    this.readyEvent.emit(this.isReady())
  }

}

interface NewTask { 
  name: string,
  deadline: string
}