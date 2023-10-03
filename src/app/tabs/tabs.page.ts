import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TabsPage {
  selectedTab: string = '';
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {}

  setSelectedTab({ tab }: any) {
    this.selectedTab = tab;
  }
}
