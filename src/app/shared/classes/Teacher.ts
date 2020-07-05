import {WorkingTime} from './WorkingTime';
import {Lesson} from './Lesson';
import {ScheduleTable} from './ScheduleTable';

export class Teacher {
  name;
  workingTimes: WorkingTime[] = [];
  hours: {available, actually} = {
    available: 0,
    actually: 0
  };

  public scheduleTable: ScheduleTable = new ScheduleTable();

  public lessonsInfo: Map<string, Lesson> = new Map<string, Lesson>();

  days: string[] =  [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница'
  ];

  pairs: number[] = [
    1,
    2,
    3,
    4,
    5,
    6
  ];

  timeProcessing() {}
}
