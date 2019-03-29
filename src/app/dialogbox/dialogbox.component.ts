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

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  @Input()
  Note:any;

  constructor(private dialog :MatDialog,private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.Note);
    // this.data=this.Note;
  }

  openDilog(note:any)
  {
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.data = {
                             noteData:note,
                        }
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '600px';
    // dialogConfig.height = '200px';
    // dialogConfig.direction= 'ltr';
    this.dialog.open(EditnoteComponent,dialogConfig)
    console.log(dialogConfig.data)
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
