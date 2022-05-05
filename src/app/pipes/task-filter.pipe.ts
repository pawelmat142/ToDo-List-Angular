import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task'

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(value: Task[], args: number): Task[] {

    let filter = args

    if (filter === 2) { 
      return value
    }
    if (filter === 1) { 
      return value.filter(task => task.done)
    }
    if (filter === 0) { 
      return value.filter(task => !task.done)
    }
  }


}
