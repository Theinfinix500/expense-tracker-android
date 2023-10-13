import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, IonicModule, CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  buttons = [7, 8, 9, '+', 4, 5, 6, '−', 1, 2, 3, '×', 0, '.', '=', '÷'];

  constructor() {}

  ngOnInit() {}
}
