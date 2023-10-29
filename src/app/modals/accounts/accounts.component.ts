import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

export interface Account {
  label: string;
  value: string;
  type: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [
    {
      label: 'CIH',
      value: 'cih',
      type: 'Cash',
      backgroundColor: 'bg-sky-500',
    },
    {
      label: 'Savings',
      value: 'savings',
      type: 'Saving account',
      backgroundColor: 'bg-emerald-500',
    },
  ];
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  createAccount() {
    this.modalCtrl.dismiss();
  }

  selectAccount(account: Account) {
    this.modalCtrl.dismiss(account);
  }
}
