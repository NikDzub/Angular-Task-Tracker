import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker v1.2';
  showTaskEditor!: boolean;
  subscription!: Subscription;

  toggleBtn() {
    this.uiService.toggleAddTask();
  }

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((bool) => {
      this.showTaskEditor = bool;
    });
  }

  ngOnInit(): void {}
}
