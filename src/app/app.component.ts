import { SupabaseService } from './services/supabase.service';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Device } from '@capacitor/device';
import { Session } from '@supabase/supabase-js';

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

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.supabaseService.authChanges((_, session) => {
      this.session = session;
      console.log(session);
    });

    const { platform } = await Device.getInfo();
    if (platform === 'web') return;
    await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
    await StatusBar.setStyle({ style: Style.Light });
  }
}
