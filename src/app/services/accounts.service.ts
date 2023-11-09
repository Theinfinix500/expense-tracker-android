import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private supabase: SupabaseService) {}

  getAccounts() {
    return this.supabase.supabase.from('accounts').select('*');
  }

  getAccount(accountId: number) {
    return this.supabase.supabase
      .from('accounts')
      .select('*')
      .eq('id', accountId)
      .single();
  }

  // async addAccount(account: Account) {
  //   const {
  //     data: {
  //       session: {
  //         user: { id: record_user },
  //       },
  //     },
  //   } = await this.supabase.supabase.auth.getSession();

  //   const {
  //     account: record_account,
  //     category: record_category,
  //     recordType: record_type,
  //     recordDate: record_date,
  //     paymentType: payment_type,
  //     ...accountData
  //   } = account;

  //   return this.supabase.supabase
  //     .from('records')
  //     .insert({
  //       ...accountData,
  //       record_type,
  //       record_date,
  //       payment_type,
  //       record_user,
  //       record_account,
  //       record_category,
  //     })
  //     .select()
  //     .single();
  // }
}
