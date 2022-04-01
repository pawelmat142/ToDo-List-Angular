import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AddingFormComponent } from './adding-form/adding-form.component';
import { TaskComponent } from './task/task.component';
import { FooterComponent } from './footer/footer.component';
import { IconBtnComponent } from './icon-btn/icon-btn.component';

import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddingFormComponent,
    TaskComponent,
    FooterComponent,
    IconBtnComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
