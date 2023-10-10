import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent implements OnInit {
  @Input() category: string = 'shopping';
  @Input() recordNote: string = 'Some grocery';
  @Input() icon: string = 'cart';
  @Input() price: number = 320;
  @Input() time: Date = new Date();
  @Input() set categoryColor(categoryColor) {
    this._categoryBgColor = this.classNames[categoryColor].bg;
    this._categoryTextColor = this.classNames[categoryColor].text;
  }

  classNames = {
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-500',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-500',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-500',
    },
    rose: {
      bg: 'bg-rose-100',
      text: 'text-rose-500',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-500',
    },
  };

  _categoryBgColor: string;
  _categoryTextColor: string;

  constructor() {}

  ngOnInit() {}
}
