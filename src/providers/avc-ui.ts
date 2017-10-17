import { Injectable } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class AvcUi {
    public loading: Loading;
    constructor(public alertCtrl: AlertController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    }

    showLoading(Content = "") {
        this.loading = this.loadingCtrl.create({
            content: Content === "" ? "Please wait..." : Content
        });
        this.loading.present();
    }

    showDialog(text: string, title = "") {
        setTimeout(() => {
            try{
                this.loading.dismiss().catch((err) => {
                    console.log(err);
                });
            }
            catch(e){
                console.log('already dismissed');
            }
        });

      let alert = this.alertCtrl.create({
          title: title === "" ? "Fail" : title,
          subTitle: text,
          buttons: ['OK']
      });
      return alert.present(prompt);
  }

    dismissLoading() {
        if (this.loading !== undefined) {
            return this.loading.dismiss().catch(err => {
                console.log(err);
            });
        }
    }

    /**
     * Show a toast message
     * @param message 
     * @param duration 
     * @param position 
     * @param cssClass 
     * @param showCloseButton 
     * @param closeButtonText 
     * @param dismissOnPageChange 
     * @return Promise <any>
     **/
    showToast(message, duration=3000, position="bottom", cssClass="avcUi", showCloseButton=false, closeButtonText="Close", dismissOnPageChange=false) {
        let toast = this.toastCtrl.create({
            "message": message,
            "duration": duration,
            "position": position,
            "cssClass": cssClass,
            "showCloseButton": showCloseButton,
            "dismissOnPageChange": dismissOnPageChange
        });

        return toast.present();
    }
}
