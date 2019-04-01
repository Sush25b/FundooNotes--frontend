import { Component, OnInit,Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.scss']
})
export class EditnoteComponent implements OnInit {
//note:any

  constructor
  (
      @Inject(MAT_DIALOG_DATA) private data:{noteData:any}
  ) { }

  note = this.data.noteData
  
  ngOnInit( ) {console.log(this.data.noteData)}


update()
{
  console.log(this.note)
}
}
