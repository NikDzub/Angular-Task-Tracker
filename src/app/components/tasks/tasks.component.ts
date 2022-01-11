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

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      if (!this.searchString) {
        this.tasks = tasks.sort((a, b) => {
          return (
            Math.abs(new Date(a.time).getTime()) -
            Math.abs(new Date(b.time).getTime())
          );
        });
      } else {
        let searchKey = this.searchString.trim();
        this.tasks = tasks
          .filter((task) => {
            return task.value.toLowerCase().includes(searchKey.toLowerCase());
          })
          .sort((a, b) => {
            return (
              Math.abs(new Date(a.time).getTime()) -
              Math.abs(new Date(b.time).getTime())
            );
          });
      }
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.toggleReminder(task).subscribe(() => {});
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.tasks.push(task);
      this.loadTasks();
    });
  }

  editTask(task: Task) {
    this.taskService.editTask(task).subscribe(() => {
      this.loadTasks();
    });
  }

  alarmReminder(tasks: Task[]) {
    tasks.forEach((task) => {
      let al = true;
      if (task.reminder) {
        console.log(task);
        let taskTime = new Date(task.time);
        if (taskTime.getTime() > new Date().getTime()) {
          let mili = taskTime.getTime() - new Date().getTime();
          console.log(mili);
          setTimeout(() => {
            if (al) {
              al = false;
              alert('alarm');
            }
          }, mili);
        }
      }
    });
  }

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }
}
