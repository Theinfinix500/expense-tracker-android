import { RecordsService } from './../services/records.service';
import { Component } from '@angular/core';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from '../components/header/header.component';
import { BalanceComponent } from '../components/balance/balance.component';
import { TransactionCardComponent } from '../components/transaction-card/transaction-card.component';
import { Record } from '@models/record.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ExploreContainerComponent,
    HeaderComponent,
    BalanceComponent,
    TransactionCardComponent,
  ],
})
export class Tab1Page implements ViewWillEnter {
  currentDate: Date = new Date();
  latestRecords: Record[];

  constructor(private recordsService: RecordsService) {}

  async ionViewWillEnter() {
    const { data: records } = await this.recordsService.getLatestRecords();

    if (records) {
      this.latestRecords = records;
    }
  }
}
