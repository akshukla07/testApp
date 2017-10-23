import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

declare var window: any;

@Component({
	selector: 'page-file-browser',
	templateUrl: 'fileBrowser.html'
})
export class FileBrowser {
	fileList = [];


	constructor(public params: NavParams, public viewCtrl: ViewController) {
		this.browseFiles();
	}


	getParentDirectory(path): Promise<any> {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(path, function(fileSystem) {
                fileSystem.getParent(function(result) {
                    resolve(result);
                }, function(error) {
                    reject(error);
                });
            }, function(error) {
                reject(error);
            });
        });
    }


    getEntriesAtRoot(): Promise<any> {
        return new Promise((resolve, reject)=>{
            console.log(window.LocalFileSystem.PERSISTENT);
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                console.log(fileSystem, fileSystem.name);
                var directoryReader = fileSystem.root.createReader();
                console.log(directoryReader);
                directoryReader.readEntries(function(entries) {
                    console.log(entries);
                    resolve(entries);
                }, function(error) {
                    reject(error);
                });
            }, function(error) {
                reject(error);
            });
        });
    }


    getEntries(path): Promise<any> {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(path, function(fileSystem) {
                var directoryReader = fileSystem.createReader();
                console.log(fileSystem, fileSystem.name);
                directoryReader.readEntries(function(entries) {
                    resolve(entries);
                }, function(error) {
                    reject(error);
                });
            }, function(error) {
                reject(error);
            });
        });
    }


	browseFiles() {	
		this.getEntriesAtRoot().then((res) => {
			console.log(res);
			this.fileList = res;
		}, (err) => {
			console.log(err);
		});
	}


	getContents(file) {
        console.log(file);
        if(file.isDirectory) {
            let path = file.nativeURL;
            this.getEntries(path).then((result) => {
                this.fileList = result;
                this.fileList.unshift({name: "[parent]"});
                this.getParentDirectory(path).then((result) => {
                    result.name = "[parent]";
                    this.fileList[0] = result;
                });
            });
        }
        else if(file.isFile) {
            let filetype = 'image/jpeg';
            file.file(function(filee) {
                console.log(filee.type); //THIS IS MIME TYPE
                file.filetype = filee.type;
            }, function() {
                console.log('error getting MIME type');
            });
            this.viewCtrl.dismiss(file);
        }
	}


	dismiss() {
		this.viewCtrl.dismiss(undefined);
	}
}
