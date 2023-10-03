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
  @Input() categoryColor: string = 'orange';

  constructor() {}

  ngOnInit() {}
}
