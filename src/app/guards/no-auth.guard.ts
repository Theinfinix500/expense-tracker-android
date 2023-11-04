import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const noAuthGuard = (): CanActivateFn => {
  return (route, state) => {
    return new Promise(async (resolve) => {
      const supabase = inject(SupabaseService);
      const router = inject(Router);
      const user = await supabase.userSession();

      if (user) {
        router.navigate(['/tabs']);
        return resolve(false);
      }

      return resolve(true);
    });
  };
};
