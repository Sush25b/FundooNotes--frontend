import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { from } from 'rxjs';
import {EditnoteComponent} from 'src/app/editnote/editnote.component';

@Component({
  selector: 'app-getnote',
  templateUrl: './getnote.component.html',
  styleUrls: ['./getnote.component.scss']
})
export class GetnoteComponent implements OnInit {

  constructor(private dialog :MatDialog,private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

    // data:any;
    userNote:any;
    noteId:any;
    data:any;
    note:any;

  ngOnInit()
   {    this.getAllNotes();
  }

//   openDilog(note:any)
//   {
//   const dialogConfig = new  MatDialogConfig();
//   dialogConfig.data = {
//                            noteData:note,
//                       }
//   dialogConfig.disableClose = false;
//   dialogConfig.autoFocus = true;
//   // dialogConfig.width = '600px';
//   // dialogConfig.height = '200px';
//   // dialogConfig.direction= 'ltr';
//   this.dialog.open(EditnoteComponent,dialogConfig)
//   console.log(dialogConfig.data)
//  }


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
