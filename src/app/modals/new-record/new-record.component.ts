import { RecordsService } from './../../services/records.service';
import { SupabaseService } from './../../services/supabase.service';
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
import { Account, AccountsComponent } from '../accounts/accounts.component';
import { Device } from '@capacitor/device';
import { CategoriesComponent } from '../categories/categories.component';
import {
  PaymentType,
  PaymentTypeComponent,
} from '../payment-type/payment-type.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RecordType, Record } from '@models/index';

@Component({
  selector: 'app-new-record',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    SelectComponent,
    CalculatorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.scss'],
})
export class NewRecordComponent implements OnInit, OnDestroy {
  recordType: RecordType = RecordType.EXPENSE;
  paymentType: PaymentType = { label: 'Cash', value: 'cash' };
  selectedAccount: Account = {
    label: 'CIH',
    value: 'cih',
    type: 'Cash',
    backgroundColor: 'bg-sky-500',
  };
  selectedCategory;

  recordForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private recordsService: RecordsService
  ) {}

  async ngOnInit() {
    this.recordForm = this.fb.group({
      account: null,
      category: null,
      paymentType: 'cash',
      recordType: RecordType.EXPENSE,
      price: 120,
      note: 'this is a simple note',
      recordDate: new Date(),
    });

    const { platform } = await Device.getInfo();
    if (platform === 'web') return;
    await StatusBar.setBackgroundColor({ color: '#001A4D' });
    await StatusBar.setStyle({ style: Style.Dark });
  }

  async ngOnDestroy() {
    const { platform } = await Device.getInfo();
    if (platform === 'web') return;
    await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
    await StatusBar.setStyle({ style: Style.Light });
  }

  closeModal() {
    this.modalCtrl.dismiss();
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

  async openAccountsModal() {
    const modal = await this.modalCtrl.create({
      component: AccountsComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.selectedAccount = data;
    }
  }

  async openCategoryModal() {
    const modal = await this.modalCtrl.create({
      component: CategoriesComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }
  async openPaymentTypeModal() {
    const modal = await this.modalCtrl.create({
      component: PaymentTypeComponent,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.paymentType = data;
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

  async saveRecord() {
    const recordData = this.recordForm.getRawValue() as Record;
    await this.recordsService.addRecord(recordData);
  }
}
