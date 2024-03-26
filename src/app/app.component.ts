import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
    spinning: boolean = false;
    prizeIndex: number = 0; // Index of the prize where the wheel should stop
    rotationSpeed: number = 200; // Initial rotation speed (milliseconds)
    rotationInterval: any;
    decelerationRate: number = 50; // Rate at which the rotation speed decreases

    prizes: string[] = [
      '../assets/images/prize1.jpg',
      '../assets/images/prize2.jpg',
      '../assets/images/prize3.jpg',
      '../assets/images/prize4.jpg',
      '../assets/images/prize5.jpg',
      '../assets/images/prize6.jpg',
      '../assets/images/prize7.jpg',
      '../assets/images/prize8.jpg',
      // Add the URLs of your prize images here
    ];

    constructor() { }

    ngOnInit(): void {
     const initialCallInterval = setInterval(() => {
        this.spinWheel();
        clearInterval(initialCallInterval);
      }, 200);

    }

    spinWheel() {
      this.spinning = true;
      this.rotateWheel();
    }

    rotateWheel() {
      let currentSpeed = this.rotationSpeed;

      this.rotationInterval = setInterval(() => {
        console.log('prize index', this.prizeIndex);
        this.prizeIndex = (this.prizeIndex + 1) % this.prizes.length;
      }, currentSpeed);

      // Decelerate the rotation speed gradually
      const decelerateInterval = setInterval(() => {
        currentSpeed += this.decelerationRate;
        if (currentSpeed >= 5000) {
          clearInterval(this.rotationInterval);
          clearInterval(decelerateInterval);
          this.spinning = false;
          console.log('Congratulations! You won: ' + this.prizes[this.prizeIndex]);
        }
      }, this.decelerationRate);
    }
}