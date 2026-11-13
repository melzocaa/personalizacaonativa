import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.taskmaster.app',
  appName: 'TaskMaster',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FCE7F3',
      showSpinner: false
    }
  }
};

export default config;