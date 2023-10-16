import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-calculator-button',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.scss'],
})
export class CalculatorButtonComponent implements OnInit {
  @Input() value;

  constructor() {}

  ngOnInit() {}

  isNum(value) {
    if (value === 0 || value === '.') return true;

    return !!Number(value);
  }

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Light });
  }
}
