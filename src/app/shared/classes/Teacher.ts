import {WorkingTime} from './WorkingTime';

export class Teacher {
  name;
  workingTimes: WorkingTime[] = [];
  hours: {available, actually};

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
