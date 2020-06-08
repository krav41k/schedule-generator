import { Injectable } from '@angular/core';
import {Schedule} from '../classes/Schedule';
import {BehaviorSubject} from 'rxjs';

export interface ScheduleRecord {
  id: number;
  schedule: Schedule;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleManagerService {

  schedules: ScheduleRecord[] = [];
  schedules$ = new BehaviorSubject(null);

  constructor() { }

  pushNewSchedule(): number {
    this.schedules.push({id: this.schedules.length, schedule: new Schedule()});
    this.schedules$.next(this.schedules);
    return this.schedules.length - 1;
  }

  getSchedule(id): Schedule {
    if (id >= this.schedules.length) return undefined;
    return this.schedules[id].schedule;
  }
}
