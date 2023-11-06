import { SupabaseService } from './services/supabase.service';
import { Component, EnvironmentInjector, NgZone, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Device } from '@capacitor/device';
import { Session } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { URLOpenListenerEvent,App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);
  session: Session;

  constructor(
    private zone: NgZone,
    private router: Router,
    private authService: AuthService
  ) {
    this.setupListener();
  }

  setupListener() {
    App.addListener('appUrlOpen', async (data: URLOpenListenerEvent) => {
      console.log('app opened with URL: ', data);

      const openUrl = data.url;
      const access = openUrl.split('#access_token=').pop().split('&')[0];
      const refresh = openUrl.split('&refresh_token=').pop().split('&')[0];

      await this.authService.setSession(access, refresh);

      this.zone.run(() => {
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      });
    });
  }

  async ngOnInit() {
    // this.supabaseService.authChanges((_, session) => {
    //   this.session = session;
    //   console.log(session);
    // });

    const { platform } = await Device.getInfo();
    if (platform === 'web') return;
    await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
    await StatusBar.setStyle({ style: Style.Light });
  }
}
