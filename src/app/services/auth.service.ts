import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private supabase: SupabaseService) {}

  signIn(email: string) {
    return this.supabase.supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: 'http://localhost:8100/tabs1' },
    });
  }

  signOut() {
    return this.supabase.supabase.auth.signOut();
  }
}
