import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  changingImage:boolean =true;
  data:any;
  cropperSettings: CropperSettings;

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth =100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true

    this.data = {};

   }

  ngOnInit() 
  {
  }

  changingProfileImage()
  {
    this.changingImage=false;
  }
  saveNewImage()
  {
    this.changingImage=true;
  }

}
