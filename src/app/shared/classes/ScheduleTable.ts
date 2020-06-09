import {Lesson} from './Lesson';

export class ScheduleTable {

  constructor(
    mon = new Array<Lesson>(12),
    tue = new Array<Lesson>(12),
    wed = new Array<Lesson>(12),
    thu = new Array<Lesson>(12),
    fri = new Array<Lesson>(12)
  ) {}
}
