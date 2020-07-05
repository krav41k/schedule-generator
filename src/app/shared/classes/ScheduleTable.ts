import {Lesson} from './Lesson';

export class ScheduleTable {

  constructor(
    public mon = new Array<Lesson>(12),
    public tue = new Array<Lesson>(12),
    public wed = new Array<Lesson>(12),
    public thu = new Array<Lesson>(12),
    public fri = new Array<Lesson>(12)
  ) {}
}
