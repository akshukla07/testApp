import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Register } from '../pages/register/register';
import { Fileupload } from '../pages/fileupload/fileupload';
import { FileBrowser } from '../pages/fileBrowser/fileBrowser';

import { AvcUi } from '../providers/avc-ui';
import { Config } from '../providers/config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';

@NgModule({
  declarations: [
    MyApp,
    Home,
    Register,
    FileBrowser,
    Fileupload
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Register,
    FileBrowser,
    Fileupload
  ],
  providers: [
    AvcUi,
    Config,
    StatusBar,
    SplashScreen,
    File,
    FileTransfer,
    Camera,
    Diagnostic,
    MediaCapture,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
