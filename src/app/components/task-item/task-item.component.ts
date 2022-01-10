import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faTimes,
  faBell,
  faInfoCircle,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../interfaces/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  faBell = faBell;
  faPen = faPen;
  faInfoCircle = faInfoCircle;

  expired!: boolean;
  showInfo: boolean = false;
  editor: boolean = false;

  editedValue!: string;
  editedTime!: string;
  editedDetails?: string;

  ifExpired(task: Task) {
    let now = new Date();
    let taskDate = new Date(task.time);
    if (taskDate < now) {
      this.expired = true;
    }
  }

  clickedDelete(task: Task): void {
    this.onDeleteTask.emit(task);
  }

  clickedReminder(task: Task) {
    this.onToggleReminder.emit(task);
  }

  clickedInfo(task: Task) {
    if (task.details) {
      this.showInfo = !this.showInfo;
      this.editor = false;
    }
  }

  clickedEdit(task: Task) {
    this.editor = !this.editor;
    this.showInfo = false;
    this.editedValue = task.value;
    this.editedTime = task.time;
    this.editedDetails = task.details;
  }

  clickedSave(task: Task) {
    if (this.editedValue && this.editedTime) {
      task.value = this.editedValue;
      task.time = this.editedTime;
      task.details = this.editedDetails;
      this.onEditTask.emit(task);
    } else {
      if (!this.editedValue) {
        alert('Please fill valid task name');
      }
      if (!this.editedTime) {
        alert('Please fill valid task time');
      }
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.ifExpired(this.task);
  }
}
