import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private addTaskVisibility: boolean = false;
  private subject = new Subject<any>();

  toggleAddTask(): void {
    this.addTaskVisibility = !this.addTaskVisibility;
    this.subject.next(this.addTaskVisibility);
  }
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor() {}
}
