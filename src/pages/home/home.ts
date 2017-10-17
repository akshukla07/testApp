import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Slides, MenuController } from 'ionic-angular';
import { Config } from '../../providers/config';  

import { Register } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: './home.html'
})

export class Home {
  @ViewChild('mySlider') slider: Slides;

  constructor(public platform: Platform, private config: Config, private menu: MenuController, private nav: NavController) {
    this.initailizeLibraries();
  }

  slides = [
    {
      title: "Welcome to the Ionic!<br/>Slide 1",
      description: "Starting point for new app development.",
      icon: "construct",
      image: ""
    },
    {
      title: "Welcome to the Ionic!<br/>Slide 2",
      description: "Starting point for new app development.",
      icon: "person",
      image: ""
    },
    {
      title: "Welcome to the Ionic!<br/>Slide 3",
      description: "Starting point for new app development.",
      icon: "options",
      image: ""
    }
  ];


  ngAfterViewInit() {
    this.slider.initialSlide = 0;
    this.slider.loop = true;
    this.slider.pager = true;

    this.platform.ready().then(() => {
      if (this.slider) {
        this.slider.update();
      }
    });
  }

  private initailizeLibraries() {
    console.log('initialize library here');
  }

  private nextSlide() {
    console.log('slide next');
    console.log(this.slider.getActiveIndex());
    if(this.slider.getActiveIndex() == 3) {
      this.nav.setRoot(Register);
    }
    else {
      this.slider.slideNext();
    }
  }

  ionViewWillEnter(){
    this.menu.enable(false);
  }


  ionViewWillUnload(){
    this.menu.enable(true);
  }
}
