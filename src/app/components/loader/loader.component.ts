import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  textArray = 'Welcome to My Portfolio'.split('');
  playSound = true;

  ngOnInit(): void {
    // Automatically stop sound after 10 seconds
    setTimeout(() => {
      this.playSound = false;
    }, 10000); // Adjust duration as needed
  }
}
