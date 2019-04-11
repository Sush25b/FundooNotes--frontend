import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { CreateNoteModel } from '../model/create-note.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { from } from 'rxjs';
import {EditnoteComponent} from 'src/app/editnote/editnote.component';
import { ViewserviceService} from 'src/app/service/viewservice.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})

export class DialogboxComponent implements OnInit {

  noteData:any;

  view:any;
  wrap:string ="wrap";
  direction:string;
  layout:string;

  @Input()
  Note:any;


  constructor(private viewservice: ViewserviceService,private dialog :MatDialog,private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

<<<<<<< HEAD
  ngOnInit() 
  {
=======
  ngOnInit() {
>>>>>>> 1abad953c8f136bfc394185eeb5cad82501ba8e2
    console.log(this.Note);
    // this.data=this.Note;

    this.viewservice.getView().subscribe(
      (res) => {
<<<<<<< HEAD
                  this.view = res;
                  this.direction = this.view.data;
                  
                  console.log(this.direction);
                  // this.layout = this.direction + " " + this.wrap;
=======
                this.view = res;
                  this.direction = this.view.data;

                  console.log(this.direction);
                  this.layout = this.direction + " " + this.wrap;
>>>>>>> 1abad953c8f136bfc394185eeb5cad82501ba8e2
        })
  }

  openDilog(note:any)
  {
    const dialogConfig = new  MatDialogConfig();
    console.log(note)


    dialogConfig.data = {
                             noteData:note,
                        }
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '600px';
    // dialogConfig.height = '200px';
    // dialogConfig.direction= 'ltr';
    this.dialog.open(EditnoteComponent,dialogConfig)
    console.log(dialogConfig.data.noteData)
  }

  loadNotes()
  {
    const token= localStorage.getItem('token');

    if(token===null)
    {
      this.router.navigateByUrl('/test');
    }
    else
    {
      const t = decode(token);
      // const id = t.userId;
    }
  }

  onPin(noteId):any
  {
    console.log(noteId);
    
    this.http.putReq("/note/ispinned?noteId="+noteId).subscribe(
     //this.http.postRequestT("/note/ispinned/noteId="+noteId,this.data).subscribe(
      // this.http.postRequestT("/note/ispinned",noteId).subscribe(  
      data=> {
        console.log(data);
        this.snackbar.open(data.Message,'Undo',{duration:1000})
      });
  }

  onArchive(noteId):any
  {
    console.log(noteId);
   
      this.http.putReq("/note/isarchieve?noteId="+noteId).subscribe(  
       data=> {
         console.log(data);
         this.snackbar.open(data.Message,'Undo',{duration:1000})
       });
  }

  onTrash(noteId):any
  {
    console.log(noteId);

      this.http.putReq("/note/trash?noteId="+noteId).subscribe(  
       data=> {
         console.log(data);
         this.snackbar.open(data.Message,'Undo',{duration:1000})
       });
  }


}
