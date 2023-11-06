import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

export interface PaymentType {
  label: string;
  value: string;
}

@Component({
  selector: 'app-payment-type',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss'],
})
export class PaymentTypeComponent implements OnInit {
  paymentTypes: PaymentType[] = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Debit card', value: 'Debit_card' },
    { label: 'Credit card', value: 'Credit_card' },
    { label: 'Bank transfer', value: 'Bank_transfer' },
    { label: 'Voucher', value: 'Voucher' },
    { label: 'Mobile payment', value: 'Mobile_payment' },
    { label: 'Web payment', value: 'Web_payment' },
  ];
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal(selectedPayment: PaymentType) {
    this.modalCtrl.dismiss(selectedPayment);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
