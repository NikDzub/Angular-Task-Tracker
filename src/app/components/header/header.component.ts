import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker v1.3';
  showTaskEditor!: boolean;
  subscription!: Subscription;

  toggleBtn() {
    this.uiService.toggleAddTask();
  }

  hasRouth(rout: string) {
    return this.router.url === rout;
  }

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService.onToggle().subscribe((bool) => {
      this.showTaskEditor = bool;
    });
  }

  ngOnInit(): void {}
}
