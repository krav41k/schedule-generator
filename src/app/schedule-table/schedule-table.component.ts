import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScheduleManagerService} from '../shared/services/schedule-manager.service';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent implements OnInit, OnDestroy {

  iSchedule;
  schedule;

  urlSub;

  constructor(
    private sm: ScheduleManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.urlSub = this.route.params.subscribe((params) => {
      this.iSchedule = params.id;
      const schedule = this.sm.getSchedule(params.id);
      schedule === undefined ? this.router.navigate(['/dashboard']) : this.schedule = schedule;
      this.test();
    });
  }

  ngOnDestroy(): void {
    this.urlSub.unsubscribe();
  }

  test() {
    this.schedule.groups.forEach(value => {
      console.log(value.lessonsInfo);
    });
  }
}
