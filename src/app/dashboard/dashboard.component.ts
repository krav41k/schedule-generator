import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScheduleManagerService, ScheduleRecord} from '../shared/services/schedule-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  schedules: ScheduleRecord[];
  subscription;

  constructor(private sm: ScheduleManagerService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.sm.schedules$.subscribe(list => {
      this.schedules = list as ScheduleRecord[];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewSchedule() {
    const id = this.sm.pushNewSchedule();
    this.router.navigate(['/schedule-kit', id]);
  }

  routeSchedule(id) {
    this.router.navigate(['/schedule', id]);
  }
}
