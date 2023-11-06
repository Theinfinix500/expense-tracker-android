import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { isPlatform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  signIn(email: string) {
    const redirectTo = isPlatform('capacitor')
      ? 'com.theinfinix500.expense-tracker://login'
      : `${window.location.origin}/login`;
    return this.supabase.supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
  }

  signOut() {
    return this.supabase.supabase.auth.signOut();
  }

  async setSession(access_token, refresh_token) {
    return this.supabase.supabase.auth.setSession({
      access_token,
      refresh_token,
    });
  }
}
