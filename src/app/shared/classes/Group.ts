import {ScheduleTable} from './ScheduleTable';

export class Group {

  public scheduleTable: ScheduleTable = new ScheduleTable();

  constructor(private iGroup, public name, public course, public numStudents, private shift = 1) {}

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
}
