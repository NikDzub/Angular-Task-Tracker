import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  searchString?: string;
  tasks: Task[] = [];
  tasksToShow: Task[] = [];
  constructor(private taskService: TaskService) {}

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.tasksToShow = tasks.sort((a, b) => {
        return (
          Math.abs(new Date(a.time).getTime()) -
          Math.abs(new Date(b.time).getTime())
        );
      });
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
      this.filterName();
    });
  }
  filterName() {
    if (this.searchString) {
      let searchKey = this.searchString.trim();
      this.tasksToShow = this.tasks.filter((task) => {
        return task.value.toLowerCase().includes(searchKey.toLowerCase());
      });
    } else {
      this.loadTasks();
    }
  }
}
