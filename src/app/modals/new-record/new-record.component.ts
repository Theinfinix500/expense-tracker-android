import { RecordsService } from './../../services/records.service';
import { StatusBar, Style } from '@capacitor/status-bar';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
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
    name: 'CIH',
    value: 'cih',
    type: 'Cash',
    backgroundColor: 'bg-sky-500',
  };
  selectedCategory;
  recordForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private recordsService: RecordsService,
    private alertController: AlertController
  ) {}

  get recordDate() {
    return this.recordForm.get('recordDate').value;
  }

  async ngOnInit() {
    this.recordForm = this.fb.group({
      account: null,
      category: null,
      paymentType: 'Cash',
      recordType: RecordType.EXPENSE,
      price: 0,
      note: '',
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
    const options = { breakpoints: [0, 0.75], initialBreakpoint: 0.75 };
    const modal = await this.openModal(AttachementsComponent, options);

    const { data, role } = await modal.onWillDismiss();
  }

  async openAccountsModal() {
    const modal = await this.openModal(AccountsComponent);
    const { data: account } = await modal.onWillDismiss();

    if (account) {
      this.selectedAccount = account;
      this.recordForm.patchValue({ account: account.id });
    }
  }

  async openCategoryModal() {
    const modal = await this.openModal(CategoriesComponent);
    const { data: category } = await modal.onWillDismiss();

    if (category) {
      this.recordForm.patchValue({ category });
    }
  }

  async openModal(component: any, options?) {
    const modal = await this.modalCtrl.create({
      ...options,
      component,
    });

    modal.present();

    return modal;
  }

  async openPaymentTypeModal() {
    const modal = await this.openModal(PaymentTypeComponent);

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.paymentType = data;
      this.recordForm.patchValue({
        paymentType: data.value,
      });
    }
  }

  changeRecordType(type: string) {
    this.recordType = type as RecordType;
    this.recordForm.patchValue({ recordType: type });
  }

  async openPicker(mode: 'date' | 'time') {
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

    const { value } = await DatePicker.present(options);
    if (!value) return;

    const oldTime = this.recordDate as Date;
    let selectedDate = new Date();
    let selectedTime = new Date();
    let recordDate = new Date();

    if (mode === 'date') {
      selectedDate = new Date(value);
      selectedDate.setHours(oldTime.getHours(), oldTime.getMinutes());
      recordDate = new Date(selectedDate);
    } else {
      const selectedValue = new Date(value);
      selectedTime = new Date(oldTime);
      selectedTime.setHours(
        selectedValue.getHours(),
        selectedValue.getMinutes()
      );
      recordDate = new Date(selectedTime);
    }

    this.recordForm.patchValue({
      recordDate,
    });
  }

  async saveRecord() {
    const recordData = this.recordForm.getRawValue() as Record;
    await this.recordsService.addRecord(recordData);
    await this.presentAlert();
  }

  setPrice(price) {
    this.recordForm.patchValue({ price });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Record added successfully',
      message: 'Do you want to add another record?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.closeModal();
          },
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.resetForm();
          },
        },
      ],
    });

    await alert.present();
  }

  resetForm() {
    this.recordForm.patchValue({
      note: '',
      price: 0,
    });
  }
}
