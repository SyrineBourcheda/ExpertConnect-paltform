import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  
  sessionCount: number = 0;
  userCount: number = 0;
  expertUserCount: number = 0;

  constructor() {
    this.updateCounts();
  }

  updateCounts() {
    const sessionTarget = 150;
    const userTarget = 60;
    const expertUserTarget = 80;

    const interval = setInterval(() => {
      if (this.sessionCount < sessionTarget) {
        this.sessionCount++;
      }

      if (this.userCount < userTarget) {
        this.userCount++;
      }

      if (this.expertUserCount < expertUserTarget) {
        this.expertUserCount++;
      }

      if (
        this.sessionCount === sessionTarget &&
        this.userCount === userTarget &&
        this.expertUserCount === expertUserTarget
      ) {
        clearInterval(interval); // Stop the interval when all targets are reached
      }
    }, 70); // Increment counts every second (adjust as needed)
  }

  getSessionCount() {
    return this.sessionCount.toString().padStart(3, );
  }

  getUserCount() {
    return this.userCount.toString().padStart(3,);
  }

  getExpertUserCount() {
    return this.expertUserCount.toString().padStart(3, );
  }
 

}
