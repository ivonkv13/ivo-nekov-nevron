import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../shared/services/calculator.service';
import { ClearNumbersResponse, SumNumbersResponse } from '../models/app-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor(private calcService: CalculatorService) {}

  numbers: number[] = [];
  sum: number = 0;

  ngOnInit() {
    this.getNumbers();
  }

  getNumbers(): void {
    this.calcService.getNumbers().subscribe({
      next: res => {
        this.numbers = res.numbers
        console.log(res.numbers)
      } ,
      error: err => console.error('Error fetching numbers:', err)
    });
  }

  generateNumber(): void {
    this.calcService.generateNumber().subscribe({
      next: res => {
        this.numbers = res.numbers
      } ,
      error: err => console.error('Error fetching numbers:', err)
    });
  }

  clearNumbers(): void {
    this.calcService.clearNumbers().subscribe({
      next: (res: ClearNumbersResponse) => {
        this.numbers = res.numbers;
        this.sum = res.sum;
      },
      error: err => console.error('Error fetching numbers:', err)
    });
  }

  sumNumbers(): void {
    this.calcService.sumNumbers().subscribe({
      next: (res: SumNumbersResponse) => {
        this.sum = res.sum;
      },
      error: err => console.error('Error summing numbers:', err)
    })
  }

  title = 'interviewtask.client';
}
