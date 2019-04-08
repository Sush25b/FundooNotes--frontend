import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { CreateNoteModel } from '../model/create-note.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';
import { ViewserviceService} from 'src/app/service/viewservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit 
{
  constructor(private viewservice: ViewserviceService,private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

  // data:any;
  userNote:any;
  noteId:any;
  data:any;
  textchange="fundooNotes!";
  list:boolean = true;
  grid:boolean = false;

  view:any;
  wrap:string ="wrap";
  direction:string;
  layout:string;
  
  ngOnInit() 
  {
    this.viewservice.getView().subscribe(
      (res )=> {
                  this.view = res;
                  this.direction = this.view.data;

                  console.log(this.direction);
                  // this.layout = this.direction + " " + this.wrap;
        })

    // this.getNotes();
    // this.http.getRequest("/note/getAll").subscribe((data)=> console.log(data))
  }
  
  changeView()
  {
          // this grid/list is only use to ==> diplay the button on toolbar
          if (this.list) 
          {
            this.grid = true;
            this.list = false;
                // this.dataservice.setCurrentdata(this.grid);
          } 
          else 
          {
            this.list = true;
            this.grid = false;
                // this.dataservice.setCurrentdata(this.list);
          }

          // viewservice===> is the service.ts file to change the entity(direction) here
          this.viewservice.gridview();
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

  // getNotes()
  // {
  //   this.http.getRequest("/note/getAlls"+"?trash=false&archive=false").subscribe(

  //     (response)=> {
  //        console.log("sucessfully get notes",response),
  //      // this.data= response('body'),
  //       //console.log("data-->",this.data)
  //       this.userNote =response;

  //     // if(response.body.status===402)
  //     // {
  //     //   this.snackbar.open(response.body.Message,'Undo',{duration:1000})
  //     // }
  //      },
  //      (error)=> {
  //           console.log("error",error);            
  //      } 
  //   )
  // }

  onLogout()
  {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  onNotes()
  {
    this.textchange="fundooNotes!";
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

  onArchive()
  {
    this.textchange="Archive";
    // console.log(noteId);
   
    //   this.http.putReq("/note/isarchieve?noteId="+noteId).subscribe(  
    //    data=> {
    //      console.log(data);
    //      this.snackbar.open(data.Message,'Undo',{duration:1000})
    //    });
  }

  onTrash():any
  {
    this.textchange="Trash";
    // console.log(noteId);

    //   this.http.putReq("/note/trash?noteId="+noteId).subscribe(  
    //    data=> {
    //      console.log(data);
    //      this.snackbar.open(data.Message,'Undo',{duration:1000})
    //    });
  }
  
}
