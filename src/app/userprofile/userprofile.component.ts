import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { CropperSettings } from 'ng2-img-cropper';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  changingImage:boolean =true;
  data:any;
  cropperSettings: CropperSettings;

  constructor( private http: HttpService, private snackbar: MatSnackBar) {
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
  saveNewImage(image)
  {
    this.changingImage=true;

    console.log("***********");

    console.log(this.data);

    this.http.getRequest("/user/profilepic?picture="+image).subscribe(
      data=> {
        console.log(data);
        this.snackbar.open("profile pic saved",'Undo',{duration:1000})
      });

  }

}
