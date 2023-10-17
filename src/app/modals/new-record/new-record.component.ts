import { StatusBar, Style } from '@capacitor/status-bar';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AttachementsComponent } from '../attachements/attachements.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { CalculatorComponent } from 'src/app/components/calculator/calculator.component';
import {
  DatePicker,
  DatePickerOptions,
} from '@capacitor-community/date-picker';

enum RecordType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}
@Component({
  selector: 'app-new-record',
  standalone: true,
  imports: [CommonModule, IonicModule, SelectComponent, CalculatorComponent],
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.scss'],
})
export class NewRecordComponent implements OnInit, OnDestroy {
  recordType: RecordType = RecordType.EXPENSE;

  constructor(private modalCtrl: ModalController) {}

  async ngOnInit() {
    await StatusBar.setBackgroundColor({ color: '#001A4D' });
    await StatusBar.setStyle({ style: Style.Dark });
    const statusBarInfos = await StatusBar.getInfo();
    console.log(statusBarInfos);
  }

  async ngOnDestroy() {
    await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
    await StatusBar.setStyle({ style: Style.Light });
  }

  async openAttachementModal() {
    const modal = await this.modalCtrl.create({
      component: AttachementsComponent,
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }

  changeRecordType(type: string) {
    this.recordType = type as RecordType;
  }

  openPicker(mode: 'date' | 'time') {
    const options: DatePickerOptions = {
      mode,
      locale: 'en_US',
      date: new Date().toISOString(),
      theme: '',
      ios: {
        format: 'dd/MM/yyyy',
      },
      android: {
        format: 'dd/MM/yyyy',
      },
    };
    DatePicker.present(options);
  }
}
