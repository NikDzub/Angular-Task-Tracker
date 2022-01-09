import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.loadTasks();
    });
  }
  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.toggleReminder(task).subscribe(() => {
      //this.loadTasks();
    });
  }
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task);
    });
  }
  sortTasks() {
    this.tasks = this.tasks.sort((a, b) => {
      return (
        Math.abs(new Date(a.time).getTime()) -
        Math.abs(new Date(b.time).getTime())
      );
    });
  }
}
