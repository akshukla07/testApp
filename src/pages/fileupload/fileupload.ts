import { Component, Injector } from '@angular/core';
import { NavController, AlertController, Platform, ModalController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Camera } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture';
import { AvcUi } from '../../providers/avc-ui';
import { Config } from '../../providers/config';
import { FileBrowser } from '../fileBrowser/fileBrowser';

@Component({
    selector: 'page-fileupload',
    templateUrl: 'fileupload.html'
})
export class Fileupload {

    private images = [];
    private user: any;
    private showDocBrowsingOption: boolean = true; // set to true to show document browsing option
    constructor(injector: Injector, public platform: Platform, private transfer: FileTransfer, private file: File, 
        public avcUi: AvcUi,public config: Config, public alertCtrl: AlertController, private diagnostic: Diagnostic, 
        private camera: Camera, public modalCtrl: ModalController, private mediaCapture: MediaCapture,
        private navParams: NavParams) {
        
        this.platform.ready().then(()=>{
            this.user = navParams.data.user;
        });
    }


    recordVoice() {
        let options: CaptureAudioOptions = { limit: 1, duration: 1};
        this.mediaCapture.captureAudio(options).then(
            (data: MediaFile[]) => {
                // console.log(data);
                console.log('here');
            },
            (err: CaptureError) => {
                console.error(err);
            }
        );
    }


    checkPermissionsAndBrowse() {
        if (this.platform.is('ios')) {
            this.browseDocs();
        }
        else {
            this.diagnostic.getPermissionsAuthorizationStatus([
                this.diagnostic.permission.READ_EXTERNAL_STORAGE,
                this.diagnostic.permission.WRITE_EXTERNAL_STORAGE
            ]).then((statuses) => {
                if(statuses.READ_EXTERNAL_STORAGE !== this.diagnostic.permissionStatus.GRANTED || statuses.WRITE_EXTERNAL_STORAGE !== this.diagnostic.permissionStatus.GRANTED) {
                    this.diagnostic.requestRuntimePermissions([
                        this.diagnostic.permission.READ_EXTERNAL_STORAGE,
                        this.diagnostic.permission.WRITE_EXTERNAL_STORAGE
                    ]).then((statuses) => {
                        if(statuses.READ_EXTERNAL_STORAGE !== this.diagnostic.permissionStatus.GRANTED || statuses.WRITE_EXTERNAL_STORAGE !== this.diagnostic.permissionStatus.GRANTED) {
                            console.log("Permission not granted!");
                        }
                        else {
                            this.browseDocs();
                        }
                    }, (error) => {
                        console.error("The following error occurred: "+error);
                    });
                }
                else {
                    this.browseDocs();
                }
            },
            (err) => {
                console.log(err);
            });
        }
    }


    browseDocs() {
        let fileBrowser = this.modalCtrl.create(FileBrowser);
        fileBrowser.onDidDismiss((selectedFile) => {
            if(typeof selectedFile == 'undefined'){
                console.log('no file selected');
            }
            else {
                this.uploadFile(selectedFile.nativeURL, selectedFile.filetype);
            }
        });
        fileBrowser.present();
    }


    uploadFile(imageUri, filetype) {
        let filename = imageUri.split('/').pop();
        this.avcUi.showLoading();
        let options: FileUploadOptions = {
            "fileKey": 'fileData',
            "fileName": filename,
            "mimeType": filetype,
            "headers": {
                "userid": this.user.id
            }
        }

        let url = 'upload-file';

        if(filetype == 'image/jpeg')
            url = 'upload-profilepic';
        
        // this.file.applicationDirectory + "www/assets/logo.png"
        this.transfer.create().upload(imageUri, this.config.uri+url, options).then(
            (data) => {
                this.avcUi.dismissLoading();
                let res = JSON.parse(data.response);
            }, (err) => {
                this.avcUi.dismissLoading();
                console.log(err)
            }
        );
    }


    selectImage(sourceType, editability) {
        console.log(sourceType, editability);
        if(!this.platform.is('core')){
            this.camera.getPicture({
				quality: 10,
                sourceType: sourceType,
				destinationType: this.camera.DestinationType.FILE_URI,
                allowEdit: editability,
                encodingType: this.camera.EncodingType.JPEG
                // mediaType: this.camera.MediaType.ALLMEDIA
			}).then((imageData) => {
                this.uploadFile(imageData, 'image/jpeg');
			}, (err) => {
				// Handle error
                console.log(err);
                //this.avcUi.showDialog('Failed to acquire image!');
			});
        }
    }


    saveFile() {
        let sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        let allowEdit = true;
        let askCam = this.alertCtrl.create({
            title: 'Proceed with:',
            enableBackdropDismiss: false,
            inputs: [{
                name: 'editability',
                type: 'checkbox',
                label: 'Allow Editing',
                value: 'true',
                checked: true
            }],
            buttons: [
                {
                    text: 'Camera',
                    handler: data => {
                        sourceType = this.camera.PictureSourceType.CAMERA;
                        allowEdit = (data[0] === 'true');
                        console.log(data[0], allowEdit);
                        this.selectImage(sourceType, allowEdit);
                    }
                },
                {
                    text: 'Gallery',
                    handler: data => {
                        sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
                        allowEdit = (data[0] === 'true');
                        console.log(data[0], allowEdit);
                        this.selectImage(sourceType, allowEdit);
                    }
                }
            ]
        });
        askCam.present();
    }
}
