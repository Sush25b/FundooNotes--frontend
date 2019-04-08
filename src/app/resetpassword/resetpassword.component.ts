import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ResetpasswordModel } from 'src/app/model/resetpassword.model';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit 
{

  token: string;
  url: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpService) { }

  reset: ResetpasswordModel = new ResetpasswordModel();
  //
  //[a-zA-Z_0-9]+@[a-zA-Z_0-9]+.[a-zA-Z_0-9]

  resetpasswordForm = this.formBuilder.group
  ({
    password: [this.reset.password, [Validators.required, Validators.minLength(4)]]

  });
  password = new FormControl('', [Validators.required, Validators.minLength(4)])

  ngOnInit() {
    //this.token = this.route.snapshot.paramMap.get('token');
  }

  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'password should at least 4 characters' : '';
  }

  onresetpassword()
   {
     console.log(this.token);
    this.url = this.token + '?password=' + this.reset.password;
    // if ( this.reset.password !== this.reset.confirmpassword)
    if (false) {
      //
    } else {

      this.http.putRequest(this.url).subscribe(
        (response) => {
          console.log("success", response)
        } );   
  }
}
}
    
    

