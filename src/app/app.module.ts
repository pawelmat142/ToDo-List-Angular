import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// pages
import { AddingFormComponent } from './pages/adding-form/adding-form.component';
import { TasksBoardComponent } from './pages/tasks-board/tasks-board.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';

// other components
import { HeaderComponent } from './components/header/header.component';
import { TaskComponent } from './components/task/task.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconBtnComponent } from './components/icon-btn/icon-btn.component';

import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddingFormComponent,
    TaskComponent,
    FooterComponent,
    IconBtnComponent,
    TasksBoardComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
