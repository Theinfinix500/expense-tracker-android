import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient;
  private _connectedUser: BehaviorSubject<User | null> = new BehaviorSubject(
    null
  );
  _session: AuthSession | null = null;
  connectedUser = this._connectedUser.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('AUTH STATE CALLED');
      console.log('SESSION::', session);
      console.log('SESSION EVENT::', event);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        // we have a connected user so add it to subject
        this._connectedUser.next(session.user);
      }

      if (event === 'SIGNED_OUT') {
        this._connectedUser.next(null);
      }
    });
  }

  async userSession() {
    const {
      data: { session },
    } = await this.supabase.auth.getSession();

    if (!session) return null;

    const { user } = session;

    return user;
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      console.log('GET SESSION()::', data.session);

      this._session = data.session;
    });
    return this._session;
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();
  }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    };

    return this.supabase.from('profiles').upsert(update);
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file);
  }
}
