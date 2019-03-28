import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-getnote',
  templateUrl: './getnote.component.html',
  styleUrls: ['./getnote.component.scss']
})
export class GetnoteComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

    // data:any;
    userNote:any;
    noteId:any;
    data:any;
    note:any;

  ngOnInit()
   {    this.getAllNotes();
  }

  getAllNotes()
  {
    this.http.getRequest("/note/getAlls"+"?trash=false&archive=false").subscribe(

      (response)=> {
         console.log("sucessfully get notes",response),
       // this.data= response('body'),
        //console.log("data-->",this.data)
        this.userNote =response;

      // if(response.body.status===402)
      // {
      //   this.snackbar.open(response.body.Message,'Undo',{duration:1000})
      // }
       },
       (error)=> {
            console.log("error",error);            
       } 
    )
  }
}
