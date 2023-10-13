import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { NewRecordComponent } from '../modals/new-record/new-record.component';

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

  constructor(private modalCtrl: ModalController) {}

  setSelectedTab({ tab }: any) {
    this.selectedTab = tab;
  }

  async createRecord() {
    const modal = await this.modalCtrl.create({
      component: NewRecordComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }
}
