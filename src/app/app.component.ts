import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-8-CRUD';


  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      console.log('Start');
    }
    if (event instanceof NavigationEnd) {
      console.log('End');
    }
    if (event instanceof NavigationError) {
      console.log('Error');
    }
    if (event instanceof NavigationCancel) {
      console.log('Cancel');
    }
  }

  ngOnInit() {

  }

}
