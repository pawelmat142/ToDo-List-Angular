import { Component, ElementRef, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { Task } from './models/task';
import { TASKS } from './models/database';
import { Action } from './models/action';
import { ActionStyles } from './models/actionStyles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent implements OnInit, AfterViewInit {

  constructor() { }

  title = 'Lista Zadań'
  
  tasks: Task[] = TASKS
  
  taskDy: number    //distance betweeen every 2 tasks
  
  isActive: boolean = false
  
  skipDuration: number = 200
  
  action: Action

  stopTransition: boolean = false
  
  order: Array<number> = this.tasks.map((t, i) => i)
  
  ngOnInit() {
    this.initAction()
  }
  
  @ViewChildren('taskRef', { read: ElementRef }) _taskElemRefArr: QueryList<ElementRef>
  taskElemRefArr: Array<HTMLElement> = []

  ngAfterViewInit() {
    this._taskElemRefArr['_results'].forEach(task =>
      this.taskElemRefArr.push(task.nativeElement)
    )
    setTimeout(() => this.taskDy = this.getTaskDy(),500)
  }

  // interaction
  onStart(x: number, y: number, _target: EventTarget): void {
    const target = (_target as HTMLElement)
    const parent = target.parentNode as HTMLElement
    let index: string
    if (target.classList.contains('task')) index = target.getAttribute('id')
    if (parent.classList.contains('task')) index = parent.getAttribute('id')
    if (index) { 
      this.isActive = true
      this.action.i = parseInt(index)
      this.action.xStart = x
      this.action.yStart = y
      this.action.iToSkip = []
    }
  }

  onStop(): void {
    if (this.isActive) { 
      this.isActive = false
      this.reorder()
      this.skip(true)
    }
  }

  onMove(x: number, y: number): void {
    if (this.isActive) { 

      this.action.dx = x - this.action.xStart
      this.action.dy = y - this.action.yStart

      let toSkip: number = this.action.dy > 0 ?
        Math.floor(this.action.dy / this.taskDy) :
        Math.ceil(this.action.dy / this.taskDy)
      if (toSkip < 0 && toSkip + this.action.i < 0)
        toSkip = this.action.i * -1 
      if (toSkip > 0 && toSkip > this.tasks.length - 1 - this.action.i)
        toSkip = this.tasks.length - 1 - this.action.i
      
      if (toSkip !== this.action.toSkip) {
        this.action.toSkip = toSkip
        this.skip(false)
      }
    }
  }

  activeStyles(): ActionStyles { 
    return {
      transition: 'unset',
      transform: `translate(${this.action.dx}px, ${this.action.dy}px)`,
      zIndex: 999
    }
  }
  
  skipStyles(i: number): ActionStyles {
    let toSkip = this.taskDy * (this.action.i > i ? 1 : -1)
    if (this.action.i === i) toSkip = this.action.toSkip * this.taskDy
    return {
      transition: `.${this.skipDuration/100}s ease`,
      transform: `translateY(${toSkip}px)`,
      zIndex: 1,
    }
  }

  
  deleteTask(i: number): void {
    this.tasks = this.tasks.filter((t, index) => i !== index)
    this.taskElemRefArr = this.taskElemRefArr.filter((t, index) => i !== index)
  }


  private initAction(): void { 
    this.action = {
      i: -1,
      iToSkip: [],
      dx: 0,
      dy: 0,
      xStart: 0,
      yStart: 0,
      toSkip: 0
    }
  }

  private clearAction(): void { 
    this.action.i = -1
    this.action.iToSkip = [],
    this.action.dx = 0,
    this.action.dy = 0,
    this.action.xStart = 0,
    this.action.yStart = 0,
    this.action.toSkip = 0
  }

  private getTaskDy(): number {
    if (this.taskElemRefArr.length > 0) 
      return this.taskElemRefArr[1].getBoundingClientRect().y - 
        this.taskElemRefArr[0].getBoundingClientRect().y
    else return 0
  }

  private skip(deactive: boolean): void {
    if (!deactive) {
      this.action.iToSkip = []
      for (let i = Math.abs(this.action.toSkip); i > 0; i--) {
        const toPush = this.action.i + (this.action.toSkip > 0 ? i : -i)
        this.action.iToSkip.push(toPush)
      }
    } else this.action.iToSkip.push(this.action.i)
  }

  private reorder(): void {
    let newTasks = []
    let newTaskElemRefArr = []
    let tasksYs = this.taskElemRefArr.map(task => task.getBoundingClientRect().y)
    setTimeout(() => { 
      this.tasks.forEach(task => {
        const iMin = tasksYs.indexOf(Math.min(...tasksYs))
        tasksYs[iMin] = 99999
        newTasks.push(this.tasks[iMin])
        newTaskElemRefArr.push(this.taskElemRefArr[iMin])
      })
      this.clearAction()
      this.stopTransition = true
      this.tasks = newTasks
      this.taskElemRefArr = newTaskElemRefArr
      setTimeout(() => this.stopTransition = false, this.skipDuration/2)
    },this.skipDuration)
  }
}

