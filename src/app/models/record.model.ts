import { RecordType } from "./record-type.enum";

export interface Record {
  account?: string;
  category?: string;
  paymentType: string;
  recordType: RecordType;
  price: number;
  note: string;
  recordDate: Date;
}
