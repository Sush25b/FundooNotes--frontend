import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';
import { ViewserviceService} from 'src/app/service/viewservice.service';
import { CurrentnoteService } from '../service/currentnote.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit {

  constructor(private CurrentnoteS: CurrentnoteService,private viewservice: ViewserviceService,private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

    // data:any;
    userNote:any;
    noteId:any;
    data:any;
    note:any;

    view:any;
    wrap:string ="wrap";
    direction:string="row";

  ngOnInit() {
    this.getBinNotes();

  }

  getBinNotes()
  {
    this.http.getRequest("/note/getAlls"+"?trash=true&archive=false").subscribe(

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
    );

    this.viewservice.getView().subscribe(
      (res) => {
                  this.view = res;
                  this.direction = this.view.data;
                  
                  console.log(this.direction);
                  // this.layout = this.direction + " " + this.wrap;
        })
  }
 
  delete(noteId):any
  {
    console.log(noteId);
   
      this.http.postReq("/note/delete?noteId="+noteId).subscribe(  
       data=> {
         console.log(data);
         this.snackbar.open(data.message,'Undo',{duration:1000})
       });

       setTimeout(  ()=>{ this.getBinNotes(); }, 500 ); 
  }

  onTrash(noteId):any
  {
    console.log(noteId);

      this.http.putReq("/note/trash?noteId="+noteId).subscribe(  
       data=> {
         console.log(data);
         this.snackbar.open(data.message,'Undo',{duration:1000})
       });

       setTimeout(  ()=>{ this.getBinNotes(); }, 500 ); 
  }

}
