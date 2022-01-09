import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  faTimes,
  faBell,
  faInfoCircle,
  faArrowDown,
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

  //@Input() color: string = 'white';

  faTimes = faTimes;
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  showInfo = false;
  expired!: boolean;

  clickedDelete(task: Task): void {
    this.onDeleteTask.emit(task);
  }

  clickedReminder(task: Task) {
    this.onToggleReminder.emit(task);
  }
  clickedInfo(task: Task) {
    if (task.details) {
      this.showInfo = !this.showInfo;
    }
  }

  ifExpired(task: Task) {
    let now = new Date();
    let taskDate = new Date(task.time);
    if (taskDate < now) {
      this.expired = true;
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.ifExpired(this.task);
  }
}
