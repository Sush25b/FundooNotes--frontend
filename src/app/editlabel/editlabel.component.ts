import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import {HttpService } from 'src/app/service/http.service';
@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  constructor
  (
          @Inject(MAT_DIALOG_DATA) private data: { label: any }
          ,private http:HttpService
  ) 
  { }

  getlabels = this.data.label;

  createlabel:any;

  ngOnInit()
  {
  }

  create()
   {
      this.http.postReq("/label/labelcreate?labelTitle="+this.createlabel).subscribe(
        data=>{
          console.log(data)
        }
      )
   }
}
