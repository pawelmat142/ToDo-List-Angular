export interface Task { 
  id?: number, 
  user_id?: number,
  name: string,
  deadline: Date,
  done: boolean,
  subtasks?: string,
}