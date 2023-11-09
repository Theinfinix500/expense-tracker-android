import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Record } from '../models/record.model';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private supabase: SupabaseService) {}

  getRecords() {
    return this.supabase.supabase.from('records').select('*');
  }

  getRecord(recordId: number) {
    return this.supabase.supabase
      .from('records')
      .select('*')
      .eq('id', recordId)
      .single();
  }

  getLatestRecords() {
    return this.supabase.supabase
      .from('records')
      .select(
        `*,
        paymentType:payment_type,
        recordDate:record_date,
        recordType:record_type
      , category:categories(*), account:accounts(*)`
      )
      .order('record_date')
      .limit(5);
  }

  async addRecord(record: Record) {
    const {
      data: {
        session: {
          user: { id: record_user },
        },
      },
    } = await this.supabase.supabase.auth.getSession();

    const {
      account: record_account,
      category: record_category,
      recordType: record_type,
      recordDate: record_date,
      paymentType: payment_type,
      ...recordData
    } = record;

    return this.supabase.supabase
      .from('records')
      .insert({
        ...recordData,
        record_type,
        record_date,
        payment_type,
        record_user,
        record_account,
        record_category,
      })
      .select()
      .single();
  }
}
