import {RoomType} from './RoomType';

export class Subject {
  public color;
  public roomTypes: RoomType[] = [];

  colorList: string[] = [
    '#E74C3C',
    '#8E44AD',
    '#5DADE2',
    '#45B39D',
    '#58D68D',
    '#F5B041',
    '#DC7633',
    '#7F8C8D',
  ];

  constructor(private iSubject, public name, private reqClassroom, roomTypes) {
    this.pickColor();
  }

  pickColor() {
    this.color = this.colorList[Math.floor(Math.random() * 8)];
  }
}
