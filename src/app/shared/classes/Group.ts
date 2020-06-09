import {Lesson} from './Lesson';

export class Group {

  private lessonsInfo: Lesson[] = [];

  constructor(private iGroup, public name, public course, public numStudents, private shift = 1) {}
}
