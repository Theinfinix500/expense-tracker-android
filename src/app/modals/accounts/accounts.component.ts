import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AccountsService } from 'src/app/services/accounts.service';

export interface Account {
  name: string;
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
  accounts: Account[] = [];

  constructor(
    private modalCtrl: ModalController,
    private accountsService: AccountsService
  ) {}

  async ngOnInit() {
    const { data: accounts } = await this.accountsService.getAccounts();
    if (accounts) {
      this.accounts = accounts.map((account) => ({
        ...account,
        name: account.account_name,
        type: account.account_type,
      }));
    }
  }

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
