import {WorkingTime} from './WorkingTime';

export class Teacher {
  name;
  workingTimes: WorkingTime[] = [];
  hours: {available, actually} = {
    available: 0,
    actually: 0
  };

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

  timeProcessing() {

  }
}
