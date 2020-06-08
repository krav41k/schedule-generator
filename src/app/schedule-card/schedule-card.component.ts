import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.scss']
})
export class ScheduleCardComponent implements OnInit {

  @Output() routeSchedule: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {}

}
