import { SupabaseService } from 'src/app/services/supabase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private supabaseService: SupabaseService) {}

  getCategories() {
    return this.supabaseService.supabase
      .from('categories')
      .select(
        `id,
        name:category_name,
        nature:category_nature,
        is_visible,
        parent:category_parent,
        subCategories:categories(
          id,
          name:category_name,
          nature:category_nature,
          parent:category_parent(name:category_name))`
      )
      .is('category_parent', null);
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
