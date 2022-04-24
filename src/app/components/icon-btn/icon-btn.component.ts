import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-btn',
  templateUrl: './icon-btn.component.html',
  styleUrls: [
    './icon-btn.component.scss',
    '../../../assets/flaticon/flaticon.scss'
  ]
})
export class IconBtnComponent implements OnChanges, OnInit {

  @Input()
  icon: string

  _icon: string

  animating: boolean = false

  animationDuration: number = 200

  icons = {
    back: ['flaticon-arrow', 'white'],
    add: ['flaticon-add-button', 'green'],
    addPink: ['flaticon-add-button', 'pink'],
    errorPink: ['flaticon-close', 'pink'],
    remove: ['flaticon-trash', 'red'],
    ok: ['flaticon-tick', 'blue'],
    important: ['flaticon-warning', 'yellow'],
    gear: ['flaticon-gear', 'yellow'],
    internet: ['flaticon-internet-gear', 'yellow'],
    user: ['flaticon-user', 'yellow'],
    error: ['flaticon-close', 'yellow'],
    errorRed: ['flaticon-close', 'red'],
    warning: ['flaticon-warning', 'yellow'],
    question: ['flaticon-question', 'yellow'],
    logout: ['flaticon-logout', 'white'],
  }

  classes = (): Array<string> => this.icons[this._icon]
  
  ngOnInit(): void {
    this.isIconAvailable(this.icon)
    this._icon = this.icon;
  }


  ngOnChanges(change: SimpleChanges): void {
    const newIcon = change['icon'].currentValue
    this.isIconAvailable(newIcon)
    this.animating = !this.animating
    setTimeout(() =>
      this.animating = !this.animating,
      this.animationDuration
    )
    setTimeout(() =>
      this._icon = newIcon,
      this.animationDuration / 2
    )
  }


  isIconAvailable(icon: string): void { 
    if (!Object.keys(this.icons).includes(icon)) { 
      throw new Error('IconBtnComponent - no icon available')
    }
  }
  
}
