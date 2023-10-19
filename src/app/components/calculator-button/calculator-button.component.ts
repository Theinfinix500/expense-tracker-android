import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() selectedNumber: EventEmitter<any> = new EventEmitter();
  @Output() selectedOperator: EventEmitter<any> = new EventEmitter();
  @Output() equalsOperator: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  isNum(value) {
    if (value === 0 || value === '.') return true;

    return !!Number(value);
  }

  async vibrate() {
    await Haptics.impact({ style: ImpactStyle.Light });

    if (this.value === '=') {
      this.equalsOperator.emit(this.value);
      return;
    }

    if (isNaN(this.value) && this.value !== '.') {
      this.selectedOperator.emit(this.value);
    } else {
      this.selectedNumber.emit(this.value);
    }
  }
}
