import { Injectable } from '@angular/core';
import { Task } from '../interfaces/Task';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  private api: string = 'http://localhost:5000/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }
  deleteTask(task: Task): Observable<Task> {
    let url = `${this.api}/${task.id}`;
    return this.http.delete<Task>(url);
  }
  toggleReminder(task: Task): Observable<Task> {
    let url = `${this.api}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task, httpOptions);
  }
  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.api, task, httpOptions);
  }
}
