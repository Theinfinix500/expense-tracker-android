import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.scss'],
})
export class CalculatorButtonComponent implements OnInit {
  @Input() value;

  constructor() {}

  ngOnInit() {}

  isNum(value) {
    console.log('executed!!');
    if (value === 0) return true;

    return !!Number(value);
  }
}
