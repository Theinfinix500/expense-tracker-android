import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.theinfinix500.expense-tracker',
  appName: 'expense-tracker',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
