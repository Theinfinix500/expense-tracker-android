import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CalculatorButtonComponent } from 'src/app/components/calculator-button/calculator-button.component';

@Component({
  selector: 'app-new-record',
  standalone: true,
  imports: [CommonModule, IonicModule, CalculatorButtonComponent],
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.scss'],
})
export class NewRecordComponent implements OnInit {
  buttons = [7, 8, 9, '+', 4, 5, 6, '−', 1, 2, 3, '×', 0, '.', '=', '÷'];

  constructor() {}

  ngOnInit() {}
}
