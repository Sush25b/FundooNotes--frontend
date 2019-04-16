import { Component, OnInit,Inject} from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { CreateNoteModel } from '../model/create-note.model';
import { CurrentnoteService } from '../service/currentnote.service';

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.scss']
})
export class EditnoteComponent implements OnInit {
//note:any

  constructor
  (
      @Inject(MAT_DIALOG_DATA) private data:{noteData:any},
      private http: HttpService, 
      private snackbar: MatSnackBar,
      private CurrentnoteS: CurrentnoteService

  ) { }

  note = this.data.noteData
  
  ngOnInit( ) 
  {
    console.log(this.data.noteData)
  }


  update()
  {
    console.log(this.note);
    this.http.putRequestT("/note/updatenote?noteId="+ this.note.noteId,this.note).subscribe(
      data => {
                  console.log(data)
        if (data.status === 200) 
        {
          this.snackbar.open(data.message, 'ok', { duration: 10000 });
        }
        else 
        {
          this.snackbar.open(data.message, 'try again', { duration: 10000 });
        }
      }
    )

    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 3000 );
  }

}
