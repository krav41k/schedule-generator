import {Group} from './Group';
import {Subject} from './Subject';
import {Teacher} from './Teacher';

export class Lesson {

  constructor(public group: Group, public subject: Subject, public teacher: Teacher, public time = 0) {}
}
