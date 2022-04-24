import { Component, ElementRef, OnInit, AfterViewInit, QueryList, ViewChildren, Output, EventEmitter, Input } from '@angular/core';
import { Action } from 'src/app/models/action';
import { ActionStyles } from 'src/app/models/actionStyles';
import { Task } from 'src/app/models/task';
import { HttpService } from 'src/app/services/http.service';
import { TasksService } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss']
})
export class TasksBoardComponent implements OnInit, AfterViewInit {

  @Output() logoutEvent = new EventEmitter<void>()

  tasks: Task[]
  
  constructor(tasksService: TasksService) { 
    tasksService.loadTasks()
    tasksService.getTasks()
      .subscribe((data: Task[]) => this.tasks = data)
  }

  @ViewChildren('taskRef', { read: ElementRef })
  taskElementsRefs: QueryList<ElementRef>

  distance: number    //distance betweeen every 2 tasks

  isActive: boolean = false
  
  skipDuration: number = 200
  
  action: Action

  stopTransition: boolean = false

  ngOnInit() {
    this.initAction() // sets Action object init state
  }
  

  ngAfterViewInit(): void {
    this.taskElementsRefs.changes.subscribe((value: any) =>
      this.distance = this.getDistance(value))
  }


  onStart(x: number, y: number, i: number): void {
    this.isActive = true
    this.action.i = i
    this.action.xStart = x
    this.action.yStart = y
    this.action.toSkip = 0
    this.action.iToSkip = []
  }


  onStop(): void {
    if (this.isActive) { 
      this.isActive = false
      this.reorder()
      this.action.iToSkip.push(this.action.i)
    }
  }


  onMove(x: number, y: number): void {
    if (this.isActive) { 

      this.action.dx = x - this.action.xStart
      this.action.dy = y - this.action.yStart

      let toSkip: number = this.action.dy > 0 ?
        Math.floor(this.action.dy / this.distance) :
        Math.ceil(this.action.dy / this.distance)
      
      if (toSkip !== this.action.toSkip) {
        if ( (this.action.i + toSkip) <= (this.tasks.length - 1)
           && (this.action.i + toSkip) >= 0 ) { 
            this.action.toSkip = toSkip
            this.skip()
          }
      }
    }
  }

  private skip(): void {
    this.action.iToSkip = []
    for (let i = Math.abs(this.action.toSkip); i > 0; i--) {
      const toPush = this.action.i + (this.action.toSkip > 0 ? i : -i)
      this.action.iToSkip.push(toPush)
    }
  }


  private reorder(): void {
    let newTasks = []
    let tasksYs = this.taskElementsRefs.map(task => task.nativeElement.getBoundingClientRect().y)
    setTimeout(() => { 
      this.tasks.forEach(task => {
        const iMin = tasksYs.indexOf(Math.min(...tasksYs))
        tasksYs[iMin] = Infinity
        newTasks.push(this.tasks[iMin])
      })
      this.clearAction()
      this.stopTransition = true
      this.tasks = newTasks
      setTimeout(() => this.stopTransition = false, this.skipDuration)
    },this.skipDuration)
  }


  activeStyles(): ActionStyles { 
    return {
      transition: 'unset',
      transform: `translate(${this.action.dx}px, ${this.action.dy}px)`,
      zIndex: 999
    }
  }
  

  skipStyles(i: number): ActionStyles {
    let toSkip = this.distance * (this.action.i > i ? 1 : -1)
    if (this.action.i === i) toSkip = this.action.toSkip * this.distance
    return {
      transition: `.${this.skipDuration/100}s ease`,
      transform: `translateY(${toSkip}px)`,
      zIndex: 1,
    }
  }


  private initAction(): void { 
    this.action = {
      i: -1,
      iToSkip: [],
      dx: 0,
      dy: 0,
      xStart: 0,
      yStart: 0,
      toSkip: 0,
    }
  }

  
  private clearAction(): void { 
    this.action.i = -1,
    this.action.iToSkip = [],
    this.action.dx = 0,
    this.action.dy = 0,
    this.action.xStart = 0,
    this.action.yStart = 0,
    this.action.toSkip = 0
  }


  private getDistance(value) { 
    if (this.taskElementsRefs.length > 1) {
      return value['_results'][1].nativeElement.getBoundingClientRect().y -
        value['_results'][0].nativeElement.getBoundingClientRect().y
    } else return 0
  }

}
