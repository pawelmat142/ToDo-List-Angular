import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  @Input() title: string

  @Output() iconEvent = new EventEmitter<void>()
  
  showForm: boolean = false

  ready: boolean = false

  icon: string = 'add'

  formHidden() { 
    return {
      transform: `
        translateY(${this.showForm ? 0 : -100}%)
        scale(${this.showForm ? 1 : .3})
      `,
    }
  }

  formButtonIcon(): string {
    let result: string = 'add'

    if (this.showForm) {
      result = 'ok'
    }

    return result
  }

  onFormButton(): void {
    console.log('onbuton')
    this.showForm = !this.showForm
    this.icon = this.showForm ? 'ok' : 'add'
  }



}
