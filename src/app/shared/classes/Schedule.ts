import {Group} from './Group';
import {Subject} from './Subject';
import {Teacher} from './Teacher';
import {Room} from './Room';
import {RoomType} from './RoomType';


export class Schedule {
  rooms: Room[] = [];
  roomTypes: RoomType[] = [];
  groups: Group[] = [];
  subjects: Subject[] = [];
  teachers: Teacher[] = [];

  constructor() {}
}
