import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { FittyDirective } from 'src/app/directives/fitty.directive';
import Big from 'big.js';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    CalculatorButtonComponent,
    FittyDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalculatorComponent),
      multi: true,
    },
  ],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit, ControlValueAccessor {
  @ViewChild('calculatorPad') calculatorPad: ElementRef;
  @ViewChild('calculatorText') calculatorText: ElementRef;

  buttons = [7, 8, 9, '+', 4, 5, 6, '−', 1, 2, 3, '×', 0, '.', '=', '÷'];
  currentOperand = '';
  previousOperand = '';
  operation;
  currentOperandTextElement = '0';
  previousOperandTextElement;

  numberChangedFn: Function;

  constructor() {}

  writeValue(obj: any): void {
    console.log(obj);
    this.currentOperandTextElement = obj;
  }

  registerOnChange(fn: any): void {
    this.numberChangedFn = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit() {}

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete(calculatorText) {
    calculatorText.refit();
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    const MAX_DIGITS = 16;
    if (this.currentOperand.length > MAX_DIGITS) return;
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    if (this.previousOperand === '') return;
    const prev = Big(this.previousOperand);
    const current = Big(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev.plus(current);
        break;
      case '−':
        computation = prev.minus(current);
        break;
      case '×':
        computation = prev.times(current);
        break;
      case '÷':
        computation = prev.div(current);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  getDisplayNumber(number) {
    if (isNaN(number) || number === '') return 0;
    const stringNumber = number.toString();
    const integerDigits = Big(stringNumber.split('.')[0] || 0);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement = this.getDisplayNumber(this.currentOperand);
    this.numberChangedFn(+this.currentOperandTextElement);

    if (this.operation != null) {
      this.previousOperandTextElement = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement = '';
    }
  }
}
