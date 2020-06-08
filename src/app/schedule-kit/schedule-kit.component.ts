import {AfterContentInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Room} from '../shared/classes/Room';
import {MatInput} from '@angular/material/input';
import {Subject} from '../shared/classes/Subject';
import {Teacher} from '../shared/classes/Teacher';
import {RoomType} from '../shared/classes/RoomType';
import {WorkingTime} from '../shared/classes/WorkingTime';
import {Group} from '../shared/classes/Group';
import {Lesson} from '../shared/classes/Lesson';
import {ScheduleManagerService} from '../shared/services/schedule-manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {async} from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-schedule-kit',
  templateUrl: './schedule-kit.component.html',
  styleUrls: ['./schedule-kit.component.scss']
})
export class ScheduleKitComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild('input') input: MatInput;

  iSchedule;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  schedule;

  selectedItemEl;
  selectedItem;

  selectedSubjectEl;
  selectedSubject;

  selectedTeacherEl;
  selectedTeacher = new Teacher();
  dayPickerOpened = false;
  pairPickerOpened = false;

  selectedGroupEl;
  selectedGroup;
  selectedLesson;

  urlSub;

  constructor(
    private formBuilder: FormBuilder,
    private sm: ScheduleManagerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.urlSub = this.route.params.subscribe(async (params) => {
      this.iSchedule = params.id;
      const schedule = this.sm.getSchedule(params.id);
      await schedule === undefined ? this.router.navigate(['/dashboard']) : this.schedule = schedule;
    });
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({});
    this.secondFormGroup = this.formBuilder.group({});
    this.thirdFormGroup = this.formBuilder.group({});
    this.fourthFormGroup = this.formBuilder.group({});
    console.log(this.schedule);
    if (this.schedule.rooms.length === 0) {
      this.addNewRoom();
      this.addNewSubject();
      this.addNewTeacher();
      this.addNewRoomType();
      this.addNewGroup();
    } else {
      this.renderSchedule();
    }
  }

  ngAfterContentInit(): void {
    if (this.schedule !== undefined) {
    }
  }

  ngOnDestroy() {
    this.urlSub.unsubscribe();
  }

  completeSchedule() {
    this.router.navigate(['/schedule/table', {id: this.iSchedule}]);
  }

  itemSelect(event, item) {
    this.selectedItem = item;
    if (this.selectedItemEl !== undefined) {
      this.selectedItemEl.style.border = '';
    }
    this.selectedItemEl = event.path.find(value => value.id === 'item-div');
    this.selectedItemEl.style.border = '2px solid gray';
    this.selectedItemEl.style.background = 'white';
  }

  subjectSelect(event, subject) {
    if (this.selectedSubjectEl !== undefined) {
      this.selectedSubjectEl.classList.remove('selected-subject');
    }

    if (event === null) {
      return false;
    }

    this.selectedSubjectEl = event.toElement;
    this.selectedSubjectEl.classList.add('selected-subject');
    this.selectedSubject = subject;
  }

  subjectLabelSelect(event, subject) {
    if (this.selectedSubjectEl !== undefined) {
      this.selectedSubjectEl.classList.remove('selected-subject');
    }

    if (event === null) {
      return false;
    }

    this.selectedSubjectEl = event.path.find(value => value.id === 'subject-label');
    this.selectedSubjectEl.classList.add('selected-subject');
    this.selectedSubject = subject;
  }

  addNewRoom() {
    this.schedule.rooms.push(new Room());
    this.firstFormGroup.addControl(`size${this.schedule.rooms.length}`, new FormControl('', null));
    this.firstFormGroup.addControl(`count${this.schedule.rooms.length}`, new FormControl('', null));
  }

  addNewSubject() {
    this.schedule.subjects.push(new Subject(this.schedule.subjects.length, null, null, null));
    this.secondFormGroup.addControl(`name${this.schedule.subjects.length}`, new FormControl('', Validators.required));
    this.fourthFormGroup.addControl(`subject${this.schedule.subjects.length}`, new FormControl('', Validators.required));
    this.fourthFormGroup.addControl(`subjectTime${this.schedule.subjects.length}`, new FormControl('', Validators.required));
  }

  addNewTeacher() {
    this.schedule.teachers.push(new Teacher());
    this.thirdFormGroup.addControl(`name${this.schedule.teachers.length}`, new FormControl('', Validators.required));
  }

  addNewRoomType() {
    this.schedule.roomTypes.push(new RoomType());
    this.firstFormGroup.addControl(`type${this.schedule.roomTypes.length}`, new FormControl('', Validators.required));
  }

  addNewGroup() {
    this.schedule.groups.push(new Group(this.schedule.groups.length, null, null, null));
    this.fourthFormGroup.addControl(`name${this.schedule.groups.length}`, new FormControl('', Validators.required));
    this.fourthFormGroup.addControl(`students${this.schedule.groups.length}`, new FormControl('', Validators.required));
    this.fourthFormGroup.addControl(`course${this.schedule.groups.length}`, new FormControl('', Validators.required));
    this.fourthFormGroup.addControl(`shift${this.schedule.groups.length}`, new FormControl('', Validators.required));
  }

  addTeacher(item) {
    if (this.selectedLesson === undefined) {
      return false;
    }

    this.selectedLesson.teacher = item;
  }

  private renderSchedule() {

    this.schedule.rooms.forEach((value, index) => {
      this.firstFormGroup.addControl(`size${index + 1}`, new FormControl('', null));
      this.firstFormGroup.addControl(`count${index + 1}`, new FormControl('', null));
    });

    this.schedule.subjects.forEach((value, index) => {
      this.secondFormGroup.addControl(`name${index + 1}`, new FormControl('', Validators.required));
      this.fourthFormGroup.addControl(`subject${index + 1}`, new FormControl('', Validators.required));
    });

    this.schedule.teachers.forEach((value, index) => {
      this.thirdFormGroup.addControl(`name${index + 1}`, new FormControl('', Validators.required));
    });

    this.schedule.roomTypes.forEach((value, index) => {
      this.firstFormGroup.addControl(`type${index + 1}`, new FormControl('', Validators.required));
    });

    this.schedule.groups.forEach((value, index) => {
      this.fourthFormGroup.addControl(`name${index + 1}`, new FormControl('', Validators.required));
      this.fourthFormGroup.addControl(`students${index + 1}`, new FormControl('', Validators.required));
      this.fourthFormGroup.addControl(`course${index + 1}`, new FormControl('', Validators.required));
      this.fourthFormGroup.addControl(`shift${index + 1}`, new FormControl('', Validators.required));
    });
  }

  placeholderClick(event) {
    event.toElement.placeholder = '';
  }

  placeholderBlur(event) {
    event.srcElement.placeholder = 'Название предмета';
  }

  addNewWorkingTime() {
    this.selectedTeacher.workingTimes.push(new WorkingTime());
    this.thirdFormGroup.addControl(`days${this.selectedTeacher.workingTimes.length}`, new FormControl());
    this.thirdFormGroup.addControl(`pairs${this.selectedTeacher.workingTimes.length}`, new FormControl());
  }

  roomTypeChecker(type): boolean {
    // return this.schedule.rooms[this.selectedIndex].roomType.find( value => value === roomType);
    return this.selectedItem !== undefined ? this.selectedItem.roomType === type : false;
  }

  roomStateChecker(type) {
    return this.selectedItemEl === undefined || this.roomTypeChecker(type);
  }

  assignType(type) {
    if (!this.roomTypeChecker(type)) {
      this.selectedItem.roomType = type;
    }
  }

  subjectCheckboxCheck(roomType): boolean {
    return this.selectedSubject !== undefined ? this.selectedSubject.roomTypes.find(value => value === roomType) : false;
  }

  subjectCheckboxState(): boolean {
    return this.selectedSubject === undefined;
  }

  manageTypes(roomType) {

    if (!this.subjectCheckboxState()) {
    this.subjectCheckboxCheck(roomType)
      ? this.selectedSubject.roomTypes = this.selectedSubject.roomTypes.filter(value => value !== roomType)
      : this.selectedSubject.roomTypes.push(roomType);
    }
  }

  teacherSelect($event, item) {
    this.selectedTeacher = item;
    if (item.workingTimes.length === 0) {
      this.addNewWorkingTime();
    }
    if (this.selectedTeacherEl !== undefined) {
      this.selectedTeacherEl.style.border = '';
    }
    this.selectedTeacherEl = $event.path.find(value => value.id === 'teacher-div');
    this.selectedTeacherEl.style.border = '2px solid gray';
    this.selectedTeacherEl.style.background = 'white';
  }

  dayPicker(day, item) {
    if (this.dayPickerOpened) {
      !item.days.find(value => value === day) ? item.days.push(day) : item.days.filter(value => value !== day);
    }
  }

  pairPicker(pair, item) {
    if (this.pairPickerOpened) {
      !item.pairs.find(value => value === pair) ? item.days.push(pair) : item.days.filter(value => value !== pair);
    }
  }

  groupSelect($event, item) {
    this.selectedLesson = null;
    this.subjectSelect(null, null);
    this.selectedGroup = item;

    if (this.selectedGroupEl !== undefined) {
      this.selectedGroupEl.style.border = '';
    }
    this.selectedGroupEl = $event.path.find(value => value.id === 'groups-div');
    this.selectedGroupEl.style.border = '2px solid gray';
    this.selectedGroupEl.style.background = 'white';
  }

  subjectLessonSelect(item) {
    if (this.selectedGroup === undefined) {
      return false;
    }

    this.selectedLesson = this.selectedGroup.lessonsInfo.find(value => value.subject === item);
    console.log();
    // if (lesson !== undefined) {
    //   this.selectedLesson = lesson;
    // } else {
    //   this.selectedGroup.lessonsInfo.push(new Lesson(item, null, null));
    //   this.selectedLesson = this.selectedGroup.lessonsInfo[this.selectedGroup.lessonsInfo.length - 1];
    // }
  }

  getLessonTime(subject) {
    if (this.selectedGroup === undefined) {
      return false;
    }

    const lesson = this.selectedGroup.lessonsInfo.find(value => value.subject === subject);
    if (lesson !== undefined) {
      return lesson.time;
    } else {
      this.selectedGroup.lessonsInfo.push(new Lesson(subject, null, 0));
      return this.selectedGroup.lessonsInfo[this.selectedGroup.lessonsInfo.length - 1].time;
    }
  }

  setLessonTime(value, subject) {
    console.log(this.selectedLesson);
    if (value !== false ) {
      this.selectedGroup.lessonsInfo.find(i => i.subject === subject).time = value;
    }
  }
}
