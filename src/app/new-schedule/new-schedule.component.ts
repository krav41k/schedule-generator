import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss']
})
export class NewScheduleComponent implements OnInit {

  @Output('newSchedule') newSchedule: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {}

}
