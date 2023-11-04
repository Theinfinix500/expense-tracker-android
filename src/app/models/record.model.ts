import { RecordType } from "./record-type.model";

export interface Record {
  account?: string;
  category?: string;
  paymentType: string;
  recordType: RecordType;
  price: number;
  note: string;
  recordDate: Date;
}
