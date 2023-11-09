import { Account } from '../modals/accounts/accounts.component';
import { RecordType } from './record-type.enum';

export interface Record {
  account?: Account;
  category?: Category;
  paymentType: string;
  recordType: RecordType;
  price: number;
  note: string;
  recordDate: Date;
}

export interface Category {
  id: number;
  category_name: string;
  category_nature: string;
  category_parent: Category | null;
  category_user: string | null;
  created_at: string;
  is_visible: boolean;
  updated_at: string;
}
