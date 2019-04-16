import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

   constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

  // data:any;
  userNote:any;
  noteId:any;
  data:any;
  note:any;

  ngOnInit()
  {
    this.getArchiveNotes();
  }

  getArchiveNotes()
  {
    this.http.getRequest("/note/getAlls"+"?trash=false&archive=true").subscribe(

      (response)=> 
      {
         console.log("sucessfully get notes",response),
       // this.data= response('body'),
        //console.log("data-->",this.data)
        this.userNote =response;
        console.log("userNote",this.userNote);
     
        // if (response.status === 200) {
        //   this.snackbar.open(response.message, 'ok', { duration: 10000 });
        // }
        // else {
        //   this.snackbar.open(response.message, 'try again', { duration: 10000 });
        // }
       },
       (error)=> {
            console.log("error",error);            
       } 
    )
  }
}
