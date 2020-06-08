import {Teacher} from './Teacher';
import {Subject} from './Subject';

export interface Lesson {
  subject: Subject;
  teacher: Teacher;
  time: number;
}

export class Group {

  private lessonsInfo: Lesson[] = [];

  constructor(private iGroup, public name, public course, public numStudents, private shift = 1) {}
}
