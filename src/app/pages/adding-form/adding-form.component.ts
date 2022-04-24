import { Component, Output, EventEmitter } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adding-form',
  templateUrl: './adding-form.component.html',
  styleUrls: [
    './adding-form.component.scss',
    '../../../assets/flaticon/flaticon.scss'
  ]
})
export class AddingFormComponent {

  @Output() addEvent = new EventEmitter<void>()
  @Output() iconEvent = new EventEmitter<void>()

  constructor(private tasksService: TasksService) { }


  addingForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    deadline: new FormControl('', [Validators.required]),
  })

  submitted = false;

  errorMsg = ''
  message = ''

  get f() { return this.addingForm.controls }

  async onSubmit() {
    this.submitted = true
    if (this.addingForm.invalid) return
    this.tasksService.addTask(this.addingForm.value as Partial<Task>)
    setTimeout(()=> this.addEvent.emit(), 200)
  }



}
