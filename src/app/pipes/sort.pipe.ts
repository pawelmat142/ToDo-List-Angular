import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task'

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Task[], active: boolean, _order?: number[]): Task[] {
    if (active) {
      return array.map((el, i) => {
        return array[_order[i]]
      })
    } else return array
  }

}
