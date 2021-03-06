import { Component, OnInit,Input, ViewChild, AfterViewInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { CreateNoteModel } from '../model/create-note.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ChildActivationEnd } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { from } from 'rxjs';
import {EditnoteComponent} from 'src/app/editnote/editnote.component';
import { ViewserviceService} from 'src/app/service/viewservice.service';
import { RowContext } from '@angular/cdk/table';
import { AddNoteComponent } from 'src/app/add-note/add-note.component';
import { CurrentnoteService } from '../service/currentnote.service';
import { SearchService } from 'src/app/service/search.service';
import { DatePipe } from '@angular/common';
import { CurrentsearchService } from 'src/app/service/currentsearch.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})

export class DialogboxComponent implements OnInit {

  noteData:any;

  view:any;
  wrap:string ="wrap";
  direction:string="row";
  layout:string;
  colors:String;

  searchterm:String;

  Notepin:any;
  Noteunpin:any;
  labels:any;
  dateTime:any;


  colorCode: string[][]= 
  [['white','lightGreen','purple','red'],
  ['orange','teal','pink','darkBlue'],['blue','brown','yellow','gray']];

  labelTitle:any;

  opendate = false;
  Date: any;
  today = new Date();
  tomorrow = new Date(this.today.setDate(this.today.getDate()+1));
  nextweek = new Date (this.today.setDate(this.today.getDate()+6));


  @Input()
  Note:[];

  // @Input()
  pinnedNote:[];

  // @Input()
  unpinnedNote:[];

  constructor(private currentS:CurrentsearchService,private searchS:SearchService,private CurrentnoteS: CurrentnoteService,private viewservice: ViewserviceService,private dialog :MatDialog,private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar,private datepipe:DatePipe) { }

  ngOnInit() 
  {
    this.getAllLabels()
    
    console.log(this.Note);
    // this.data=this.Note;

    this.viewservice.getView().subscribe(
      (res) => {
                  this.view = res;
                  this.direction = this.view.data;
                  
                  console.log(this.direction);
                  // this.layout = this.direction + " " + this.wrap;
        }),

    //it is from CurrentnoteService-->Service
    this.CurrentnoteS.currentnote.subscribe(
      (message)=>
      {
        this.Note =message
      }),

    //it is for Search pipe
    // this.searchS.searchtext.subscribe(
    //   (text)=>{  
    //     this.searchterm = text;
    //     // console.log(this.searchterm);

    //   }
    // )

    //it is for Elastic Search 
    this.currentS.currentsearch.subscribe(
      (text)=>{ 
        console.log(text); 
        this.Note = text;
      }
    )
  }

  checkcondition()
  {
    
        // for(var i=0;i<this.Note.length;i++)
        // {  
        //     console.log(this.Note.length);
        //       if(this.Note[i].pinned === true)
        //       {
        //           //this.Notepin.push(this.Note[i]);
        //           console.log(this.Note[i].pinned);
        //           console.log(this.Note[i]);
        //           this.pinnedNote.push(this.Note[i]);
        //           break;
        //       }
        //        else{}
        //  };
        //  console.log(this.pinnedNote);

        //  for(var i=0;i<response.length;i++)
        // {  
        //     console.log(response.length);
        //       if(response[i].pinned === false)
        //       {
        //           //this.Notepin.push(this.Note[i]);
        //           console.log(response[i].pinned);
        //           this.unpinnedNote.push(response[i]);
            
        //       }
        //        else{}
        //  };
        //  console.log(this.unpinnedNote);

  }

  profileselect()
  {
    
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
        this.snackbar.open(data.message,'Undo',{duration:1000})
      });

      setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  onArchive(noteId):any
  {
    console.log(noteId);
   
      this.http.putReq("/note/isarchieve?noteId="+noteId).subscribe(  
       data=> {
         console.log(data);
         this.snackbar.open(data.message,'Undo',{duration:1000})
       });

       setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  onTrash(noteId):any
  {
    console.log(noteId);

      this.http.putReq("/note/trash?noteId="+noteId).subscribe(  
       data=> {
         console.log(data);
         this.snackbar.open(data.message,'Undo',{duration:1000})
       });

       setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  setColorToTitle(color,notes)
  {
    console.log(color);
    console.log(notes.noteId);
    this.colors=color;
    notes.color=color;
    
    this.http.putRequestT("/note/updatenote?noteId="+ notes.noteId,notes).subscribe(
      data => {
        console.log(data)
        if (data.status === 200) {
          this.snackbar.open(data.message, 'ok', { duration: 10000 });
        }
        else {
          this.snackbar.open(data.message, 'try again', { duration: 10000 });
        }
      }
    )
  }

  // setColorToTitle(color)
  // {
  //   console.log(color);
  //   this.notes.color=color;
  // }
  getAllLabels(){
    this.http.getRequest("/label/getAlls").subscribe(
      (response) =>{
       // console.log(data);
        this.labels=response;
        console.log(this.labels)
      }
    )

  }
  addLabel(noteid:any,labelName:any){
    console.log(noteid);
    console.log(labelName);
    this.http.postReq("/label/labelToNote?labelTitle="+labelName.labelTitle+"&noteId="+noteid).subscribe(
      data =>{
        console.log(data)
      }
    );
    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  addLabelToNote(noteid:any){
    console.log(noteid);
    console.log(this.labelTitle);
    this.http.postReq("/label/labelToNote?labelTitle="+this.labelTitle+"&noteId="+noteid).subscribe(
      data =>{
        console.log(data)
      }
    );

    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  removeLabel(noteid:any,labelid:any)
  { 
    console.log(noteid+" "+labelid)
    this.http.deleteReq("/label/deleteLabelNote?noteId="+noteid+"&labelId="+labelid).subscribe(
      data =>{
        console.log(data)
      }
    );

    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  saveDateandTime(noteid: any) 
  {
    console.log(this.dateTime)
    console.log(noteid)
    this.http.postReq("/note/reminder?noteId=" + noteid + "&reminder=" + this.dateTime).subscribe(
      data =>
      {
        console.log(data);
      }
    );

    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }
  
  removeReminder(noteid: any) 
  {
    console.log(noteid);
    this.http.deleteReq("/note/reminderdelete?noteId=" + noteid).subscribe(
      data => {
        console.log(data)
      }
    );
    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  todayRem(noteid: any) 
  {
    this.Date = this.datepipe.transform(this.today, "yyyy-MM-dd");
    var gmt = this.Date + "T" + "08:00:00"
    console.log('normal string-->' + gmt);
    let newDate = new Date(gmt);
    console.log('converted Date-->' + newDate)

    console.log("tttttttttttt"+newDate)
    this.http.postReq("/note/reminder?noteId=" + noteid + "&reminder=" + newDate).subscribe(
      data => {
        console.log(data);
      }
    );
    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  tomorrowRem(noteid:any)
  {
    console.log(this.tomorrow)
    this.Date = this.datepipe.transform(this.tomorrow, "yyyy-MM-dd");
    var gmt = this.Date + "T" + "08:00:00"
    console.log('normal string-->' + gmt);
    let newDate = new Date(gmt);
    console.log('converted Date-->' + newDate)
    this.http.postReq("/note/reminder?noteId=" + noteid + "&reminder=" + newDate).subscribe(
      data => {
        console.log(data);
      }
    );

    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

  nextWeek(noteid:any)
  {
    console.log(this.nextweek)
    this.Date = this.datepipe.transform(this.nextweek, "yyyy-MM-dd");
    var gmt = this.Date + "T" + "08:00:00"
    console.log('normal string-->' + gmt);
    let newDate = new Date(gmt);
    console.log('converted Date-->' + newDate)
    this.http.postReq("/note/reminder?noteId=" + noteid + "&reminder=" + newDate).subscribe(
      data => {
        console.log(data);
      }
    );
    setTimeout(  ()=>{ this.CurrentnoteS.getAllNotes(); }, 500 );
  }

}
