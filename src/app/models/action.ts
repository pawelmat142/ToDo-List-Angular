export interface Action { 
  i: number
  dx: number
  dy: number,
  xStart: number
  yStart: number
  toSkip: number          //number of elements to skip - negative value means the opposite direction
  iToSkip: Array<number>  //indexes of elements to skip
}