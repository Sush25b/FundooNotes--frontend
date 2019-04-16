import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
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

  constructor(
    private active: ActivatedRoute,
    private router: Router,
     private formBuilder: FormBuilder, private http: HttpService,private snackbar: MatSnackBar) { }

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

      console.log( this.active.snapshot.paramMap.get('token') , this.resetpasswordForm.value.password);
      this.http.getResetReq("/user/resetPassword/"+this.active.snapshot.paramMap.get('token')+"?password="+this.resetpasswordForm.value.password).subscribe(
            (response) => {
                               console.log("success",response);
                            
                                if (response.status === 200) {
                                  this.snackbar.open(response.message, 'ok', { duration: 10000 });
                                }
                                else {
                                  this.snackbar.open(response.message, 'try again', { duration: 10000 });
                                };
                                this.router.navigateByUrl('/login');
                          },     //redirect to same page   
            (error)=> {console.log("error",error)}
      )
   }
}
    
    

