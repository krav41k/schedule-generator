import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScheduleManagerService} from '../shared/services/schedule-manager.service';
import {Lesson} from '../shared/classes/Lesson';
import {BehaviorSubject} from 'rxjs';
import {ScheduleTable} from '../shared/classes/ScheduleTable';

@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.scss']
})
export class ScheduleTableComponent implements OnInit, OnDestroy {

  iSchedule;
  schedule;

  state: BehaviorSubject<boolean> = new BehaviorSubject(false);

  urlSub;

  constructor(
    private sm: ScheduleManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.urlSub = this.route.params.subscribe((params) => {
      this.iSchedule = params.id;
      const schedule = this.sm.getSchedule(params.id);
      if (schedule === undefined) {
        this.router.navigate(['/dashboard']);
      } else {
        this.schedule = schedule;
        this.clearSchedule();
        this.generateSchedule();
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.urlSub.unsubscribe();
  }

  generateSchedule() {
    this.schedule.teachers.forEach(teacher => {
      teacher.lessonsInfo.forEach(lesson => {
        let lessonTime = lesson.time;
        if (lesson.time - Math.trunc(lesson.time) !== 0 ) {
           const lessonStatement = this.timeStatement(teacher, lesson.group, lesson.subject, 0.5);
           if (lessonStatement === undefined) {
             console.warn(teacher, lesson.group, lesson.subject, 0.5);
           } else {
             this.assignLesson(lessonStatement.day, lessonStatement.pair, 0.5, lesson.group, teacher, lesson.subject);
           }
           lessonTime -= 0.5;
        }
        while (lessonTime !== 0) {
          const lessonStatement = this.timeStatement(teacher, lesson.group, lesson.subject, 1);
          if (lessonStatement === undefined) {
            console.warn(teacher, lesson.group, lesson.subject, 1);
          } else {
            this.assignLesson(lessonStatement.day, lessonStatement.pair, 1, lesson.group, teacher, lesson.subject);
          }
          lessonTime -= 1;
        }
      });
    });
    this.schedule.complete = true;
    this.state.next(true);
  }

  timeStatement(teacher, group, subject, time) {
    if (teacher.workingTimes.length > 0) {
      let info;
      teacher.workingTimes.forEach(workingTime => {
        workingTime.days.pop();
        info = this.checkTime(workingTime, group, teacher, subject, time);
      });
      if (info !== undefined) {
        return info;
      }
    }

    return this.checkTime(teacher, group, teacher, subject, time);
  }

  checkTime(obj, group, teacher, subject, time) {
    for (let day of obj.days) {
      for (let pair of obj.pairs) {
        const groupDay = this.getTime(day, pair, group);
        if (groupDay === undefined) {
          break;
        }
        if (groupDay.obj !== undefined && groupDay.obj.subject.iSubject === subject.iSubject) {
          break;
        }
        if (
          groupDay.obj !== undefined
          && time === 0.5 && groupDay.obj.time === 0.5
          && this.getTime(day, pair + 6, group).obj === undefined
        ) {
          const teacherDay = this.getTime(day, pair, teacher);
          if (teacherDay.obj === undefined
            || (time === 0.5 && teacherDay.obj.time === 0.5
              && this.getTime(day, pair + 6, group).obj === undefined)
          ) {
            return {day: teacherDay.day, pair: pair + 6};
          }
        }
        if (groupDay.obj === undefined) {
          const teacherDay = this.getTime(day, pair, teacher);
          if (teacherDay.obj === undefined) {
            return {day: teacherDay.day, pair};
          }
        }
      }
    }
  }

  assignLesson(day, pair, time, group, teacher, subject) {
    switch (day) {
      case 1:
        group.scheduleTable.mon[pair - 1] = new Lesson(group, subject, teacher, time);
        teacher.scheduleTable.mon[pair - 1] = new Lesson(group, subject, teacher, time);
        break;
      case 2:
        group.scheduleTable.tue[pair - 1] = new Lesson(group, subject, teacher, time);
        teacher.scheduleTable.tue[pair - 1] = new Lesson(group, subject, teacher, time);
        break;
      case 3:
        group.scheduleTable.wed[pair - 1] = new Lesson(group, subject, teacher, time);
        teacher.scheduleTable.wed[pair - 1] = new Lesson(group, subject, teacher, time);
        break;
      case 4:
        group.scheduleTable.thu[pair - 1] = new Lesson(group, subject, teacher, time);
        teacher.scheduleTable.thu[pair - 1] = new Lesson(group, subject, teacher, time);
        break;
      case 5:
        group.scheduleTable.fri[pair - 1] = new Lesson(group, subject, teacher, time);
        teacher.scheduleTable.fri[pair - 1] = new Lesson(group, subject, teacher, time);
        break;
    }
  }

  getTime(day, pair, object) {
    switch (day) {
      case 'понедельник' || 1:
        return {obj: object.scheduleTable.mon[pair - 1], day: 1};
      case 'вторник' || 2:
        return {obj: object.scheduleTable.tue[pair - 1], day: 2};
      case 'среда' || 3:
        return {obj: object.scheduleTable.wed[pair - 1], day: 3};
      case 'четверг' || 4:
        return {obj: object.scheduleTable.thu[pair - 1], day: 4};
      case 'пятница' || 5:
        return {obj: object.scheduleTable.fri[pair - 1], day: 5};
    }
  }

  findLessonType(lesson): number {
    return lesson === undefined ? 0 : lesson.time === 0.5 ? 1 : lesson.time === 1 ? 2 : 0;
  }

  goScheduleKit() {
    this.router.navigate(['/schedule-kit', this.iSchedule]);
  }

  private clearSchedule() {
    this.schedule.teachers.forEach(teacher => {
      teacher.scheduleTable = new ScheduleTable();
    });

    this.schedule.groups.forEach(group => {
      group.scheduleTable = new ScheduleTable();
    });
  }
}
