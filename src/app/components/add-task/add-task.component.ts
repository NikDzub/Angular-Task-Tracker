import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  subscription!: Subscription;
  faBell = faBell;
  value!: string;
  time!: string;
  reminder: boolean = false;
  details!: string;

  submitTask() {
    if (!this.value) {
      alert('task name is required');
      return;
    }
    if (!this.time) {
      alert('task time is required');
      return;
    }
    const newTask: Task = {
      value: this.value,
      time: this.time,
      reminder: this.reminder,
      details: this.details,
    };

    this.onAddTask.emit(newTask);

    this.value = '';
    this.reminder = false;
    this.time = '';
    this.details = '';
  }

  showTaskEditor!: boolean;

  reminderToggle() {
    this.reminder = !this.reminder;
  }

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((bool) => {
      this.showTaskEditor = bool;
    });
  }

  ngOnInit(): void {}
}
