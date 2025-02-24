import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../shared/services/calculator.service';
import { ClearNumbersResponse, SumNumbersResponse } from '../models/app-models';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor(private calcService: CalculatorService) {}

  numbers: number[] = [];
  sum: number = 0;
  title = 'interviewtask.client';

  private destroyed$ = new Subject<void>();

  ngOnInit() {
    this.getNumbers();
  }

  getNumbers(): void {
    this.calcService.getNumbers().pipe(takeUntil(this.destroyed$))
      .subscribe({
      next: res => {
        this.numbers = res.numbers
        console.log(res.numbers)
      } ,
      error: err => console.error('Error fetching numbers:', err)
    });
  }

  generateNumber(): void {
    this.calcService.generateNumber().pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: res => {
        this.numbers = res.numbers
      } ,
      error: err => console.error('Error fetching numbers:', err)
    });
  }

  clearNumbers(): void {
    this.calcService.clearNumbers().pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: (res: ClearNumbersResponse) => {
        this.numbers = res.numbers;
        this.sum = res.sum;
      },
      error: err => console.error('Error fetching numbers:', err)
    });
  }

  sumNumbers(): void {
    this.calcService.sumNumbers().pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: (res: SumNumbersResponse) => {
        this.sum = res.sum;
      },
      error: err => console.error('Error summing numbers:', err)
    })
  }

}
