import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from '../components/header/header.component';
import { BalanceComponent } from '../components/balance/balance.component';

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
  ],
})
export class Tab1Page {
  constructor() {}
}
