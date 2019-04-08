import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import {ForgetpasswordModel } from 'src/app/model/forgetpassword.model';
import { HttpService } from '../service/http.service';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,private http:HttpService) { }

  user: ForgetpasswordModel = new ForgetpasswordModel();

  forgetpasswordForm = this.formBuilder.group({
    //emaid--->is from fogerpassword.model.ts class file 
    emailid: [this.user.emailid, [Validators.required, Validators.email]]

  });

  emailid = new FormControl('', [Validators.required, Validators.email])

  ngOnInit() {
  }

  //email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessageUsername() {
    return this.emailid.hasError('required') ? 'plz enter valid emaild' : this.emailid.hasError('email') ? 'Not a valid email' :
    '';
  }

  onForget()
  {
    console.log(this.forgetpasswordForm.value)
  
    // // this.http.postRequest("fundooNotes/login",this.loginForm.value);
    // this.http.postForm(this.forgetpasswordForm.value).subscribe(
    //   (response) => {console.log("success",response)
    //  this.router.navigateByUrl('/test')},
    //  (error)=> {console.log("error",error)}
    // )

    //postrequest--->is the server Method 
    // to which api it should hit
    this.http.postRequest("/forgetpassword",this.forgetpasswordForm.value).subscribe(
      (response) => {console.log("success",response)
     this.router.navigateByUrl('/forgetpassword')},     //redirect to same page   
     (error)=> {console.log("error",error)}
    )

  }
}
