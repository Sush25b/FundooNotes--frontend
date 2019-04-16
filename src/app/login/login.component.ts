import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/login.model';
import { HttpService } from '../service/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent implements OnInit
{
  hide = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

  user: LoginModel = new LoginModel();
  //
  //[a-zA-Z_0-9]+@[a-zA-Z_0-9]+.[a-zA-Z_0-9]

  loginForm = this.formBuilder.group({
    emailid: [this.user.emailid, [Validators.required, Validators.email]],
    password: [this.user.password, [Validators.required, Validators.minLength(4)]]


  });
  
  emailid = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required, Validators.minLength(4)])

  ngOnInit() {
  }

  getErrorMessageUsername() {
    return this.emailid.hasError('required') ? 'valid emailid required' : this.emailid.hasError('email') ? 'enter a valid email' :
      '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'password should at least 4 characters' : '';
  }

  onLogin() {
    console.log(this.loginForm.value)
    // debugger
    // this.http.postRequest("fundooNotes/login",this.loginForm.value);
    //OR
    //  this.http.postForm(this.loginForm.value).subscribe(
    //    (response) => {console.log("success",response)
    //   this.router.navigateByUrl('/login')},
    //   (error)=> {console.log("error",error)}
    //  )

    //postrequest--->is the server Method 
    // to which api it should hit
    this.http.postRequest("/login", this.loginForm.value).subscribe
    (
      //  (response) => {console.log("success",response)
      data => 
      { 
         console.log(data);

        if (data.status === 200) 
        {
          // debugger

          localStorage.setItem('token',data.token);
          this.router.navigateByUrl("/dashboard");
        
          //snackbar
          this.snackbar.open(data.message, 'Undo', { duration: 1000 });
        }
        else 
        {
          this.snackbar.open(data.message, 'Undo', { duration: 1000 });
        }
      }
    )
  }

}
