import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import {MatRippleModule} from '@angular/material/core';
import { ScheduleKitComponent } from './schedule-kit/schedule-kit.component';
import {AppRoutingModule} from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import { SubjectItemDirective } from './shared/directives/subject-item.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { ScheduleCardComponent } from './schedule-card/schedule-card.component';
import { ScheduleTableComponent } from './schedule-table/schedule-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NewScheduleComponent,
    ScheduleKitComponent,
    DashboardComponent,
    SubjectItemDirective,
    ScheduleCardComponent,
    ScheduleTableComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatRippleModule,
        AppRoutingModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FlexModule,
        FlexLayoutModule,
        MatCheckboxModule,
        MatSelectModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
