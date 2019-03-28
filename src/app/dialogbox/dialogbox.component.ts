import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { CreateNoteModel } from '../model/create-note.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';


@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  @Input()
  Note:any;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.Note);
    // this.data=this.Note;
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
