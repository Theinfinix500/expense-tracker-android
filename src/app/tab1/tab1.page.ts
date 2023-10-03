import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from '../components/header/header.component';
import { BalanceComponent } from '../components/balance/balance.component';
import { TransactionCardComponent } from '../components/transaction-card/transaction-card.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ExploreContainerComponent,
    HeaderComponent,
    BalanceComponent,
    TransactionCardComponent,
  ],
})
export class Tab1Page {
  currentDate: Date = new Date();
  constructor() {}
}
