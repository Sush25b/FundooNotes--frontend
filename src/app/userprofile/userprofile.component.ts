import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
// import { CropperSettings } from 'ng2-img-cropper';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperModule } from 'ngx-image-cropper';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})


export class UserprofileComponent implements OnInit {

  // changingImage:boolean =true;
  // cropperSettings: CropperSettings;
  data:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';


  constructor( private http: HttpService, private snackbar: MatSnackBar,public dialogRef: MatDialogRef<UserprofileComponent>) 
  {
    // this.cropperSettings = new CropperSettings();
    // this.cropperSettings.width = 100;
    // this.cropperSettings.height = 100;
    // this.cropperSettings.croppedWidth =100;
    // this.cropperSettings.croppedHeight = 100;
    // this.cropperSettings.canvasWidth = 400;
    // this.cropperSettings.canvasHeight = 300;
    // this.cropperSettings.rounded = true

    // this.data = {};

   }

  ngOnInit() 
  {

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event:any) {
  console.log(event);
  this.croppedImage = event;
  }
   
  imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}
  setProfile()
  {
    if(this.croppedImage!=null)
    {
      this.dialogRef.close(this.croppedImage);
    }
  }
}

  // changingProfileImage()
  // {
  //   this.changingImage=false;
  // }

  // saveNewImage(image)
  // {
  //   this.changingImage=true;
  //   console.log("***********");
  //   console.log(image);

  //   this.http.reqmap("user/profileupload?File="+image).subscribe(
  //     data=> {
  //       console.log(data);
  //       this.snackbar.open("profile pic saved",'Undo',{duration:1000})
  //     });
  // }


