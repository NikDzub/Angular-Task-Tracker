import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe((bool) => {
      this.showTaskEditor = bool;
    });
  }

  ngOnInit(): void {}

  title: string = 'Task Tracker v1.0';
  showTaskEditor!: boolean;
  subscription!: Subscription;

  toggleBtn() {
    this.uiService.toggleAddTask();
  }
}
