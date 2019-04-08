import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/model/register.model';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  
  constructor(private router: Router, private formBuilder: FormBuilder,private http:HttpService) { }

  user: RegisterModel = new RegisterModel();

  registerForm = this.formBuilder.group({
    firstName: [this.user.firstName, [Validators.required]],
    lastName: [this.user.lastName, [Validators.required]],
    phoneno: [this.user.phoneno, [Validators.required]],
    emailid: [this.user.emailid, [Validators.required, Validators.email]],
    password: [this.user.password, [Validators.required, Validators.minLength(4)]]
  });

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  phoneno = new FormControl('', [Validators.required]);
  emailid = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  ngOnInit() {
  }

  //phoneNo.matches("\\d{10}")

  //this.firstName ===> is of FormControl
  getErrorMessageFirstName() {
    return this.firstName.hasError('required') ? 'enter a valid name' :
      this.firstName.hasError('email') ? 'Not a valid email' :
        '';
  }


  getErrorMessageLastName() {
    return this.lastName.hasError('required') ? 'enter a valid name' : '';
  }


  getErrorMessagePhoneNo() {
    return this.phoneno.hasError('required') ? 'enter a valid phoneno' : '';
  }


  getErrorMessageEmailid() {
    return this.emailid.hasError('required') ? 'plz enter valid emaild' : this.emailid.hasError('email') ? 'Not a valid email' :
      '';

  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'password should at least 4 characters' : '';
  }

  onRegister()
  {
    console.log(this.registerForm.value)

     //postrequest--->is the server Method 
    // to which api it should hit
    this.http.postRequest("/register",this.registerForm.value).subscribe(
      (response) => {console.log("success",response)
     this.router.navigateByUrl('/register')},     //redirect to same page   
     (error)=> {console.log("error",error)}
    )
  }
}
