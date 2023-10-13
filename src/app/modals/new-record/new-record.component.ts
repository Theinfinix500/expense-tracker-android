import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AttachementsComponent } from '../attachements/attachements.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { CalculatorComponent } from 'src/app/components/calculator/calculator.component';

@Component({
  selector: 'app-new-record',
  standalone: true,
  imports: [CommonModule, IonicModule, SelectComponent, CalculatorComponent],
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.scss'],
})
export class NewRecordComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openAttachementModal() {
    const modal = await this.modalCtrl.create({
      component: AttachementsComponent,
      breakpoints: [0, 0.25, 0.5, 0.75],
      initialBreakpoint: 0.75,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }
}
