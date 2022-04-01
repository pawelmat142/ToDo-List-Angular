import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-btn',
  templateUrl: './icon-btn.component.html',
  styleUrls: [
    './icon-btn.component.scss',
    './flaticon/flaticon.scss'
  ]
})
export class IconBtnComponent implements OnChanges, OnInit {

  @Input()
  icon: string
  _icon: string

  icons = {
    add: ['flaticon-add', 'green'],
    remove: ['flaticon-rubbish-bin', 'red'],
    ok: ['flaticon-tick', 'blue'],
    important: ['flaticon-warning', 'yellow']
  }


  classes = (): Array<string> => this.icons[this._icon]
  

  animating: boolean = false
  animationDuration: number = 200
  

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
