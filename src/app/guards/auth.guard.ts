import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard = (): CanActivateFn => {
  return (route, state) => {
    return new Promise(async (resolve) => {
      const supabase = inject(SupabaseService);
      const router = inject(Router);
      const user = await supabase.userSession();

      if (!user) {
        router.navigate(['/login']);
        return resolve(false);
      }

      return resolve(true);
    });
  };
};
