import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.scss']
})
export class LessonItemComponent implements OnInit {

  @Input() lessonIdx;
  @Input() lesson;
  @Input() secondLesson;
  @Input() lessonType;

  constructor() {
  }

  ngOnInit(): void {}
}

