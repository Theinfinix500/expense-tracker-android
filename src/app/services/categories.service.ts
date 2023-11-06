import { SupabaseService } from 'src/app/services/supabase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private supabaseService: SupabaseService) {}

  getCategories() {
    return this.supabaseService.supabase.from('categories').select('*');
  }

  // arrayToObject(data: any[]) {
  //   const obj = {};

  //   data.forEach((item) => {
  //     if (!obj[item.id]) {
  //       obj[item.id] = item;
  //     }
  //   });

  //   return data.map((item) => {
  //     return {
  //       ...item,
  //       category_parent:
  //         item.category_parent !== null
  //           ? { ...obj[item.category_parent] }
  //           : null,
  //     };
  //   });
  // }
}
