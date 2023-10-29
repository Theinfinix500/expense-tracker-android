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
    { label: 'Cash', value: 'cash' },
    { label: 'Debit card', value: 'debitCard' },
    { label: 'Credit card', value: 'creditCard' },
    { label: 'Bank transfer', value: 'bankTransfer' },
    { label: 'Voucher', value: 'voucher' },
    { label: 'Mobile payment', value: 'mobilePayment' },
    { label: 'Web payment', value: 'webPayment' },
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
