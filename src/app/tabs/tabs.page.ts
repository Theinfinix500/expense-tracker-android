import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class TabsPage {
  selectedTab: string = '';
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {}

  setSelectedTab({ tab }: any) {
    this.selectedTab = tab;
  }
}
