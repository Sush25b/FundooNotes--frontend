import { Component, OnInit } from '@angular/core';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { CreateNoteModel } from '../model/create-note.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NoteComponent } from '../note/note.component';

// 
// 

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})

export class AddNoteComponent implements OnInit {

  constructor(private mattooltip:MatTooltipModule, private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }

  private flag= false;
  colors:String;
  title:any;
  description:any;
  // model:any ={};
  // title = new FormControl('')
  // description = new FormControl('')

  //addnoteForm
  //  CreateNoteModel
  Note: CreateNoteModel=new CreateNoteModel();

  // addnoteForm = this.formBuilder.group({
  //   // emailid: [this.user.emailid, [Validators.required, Validators.email]]
  //   title:[this.Note.title],
  //   description:[this.Note.description],
  //   color:[this.Note.color]
  // })
  


  // this.model{
  //   this.model.
  // }
 
  ngOnInit()
  {

  }

  show(){
  this.flag=!this.flag;
  }

  onClose()
  {
    //,{headers:new HttpHeaders().set("jwtToken",localStorage.getItem("token")),observe:'response'}
    
    // this.data.title=this.title.value;
    // this.data.description=this.description.value;
    // this.data.color=this.colors.value;
    
    console.log(this.Note);

    // this.model=
    // {
    //   "title":this.title.value,
    //   "description":this.description.value,
    //   "color":this.colors
    // }
    

    this.http.postRequestT("/note/createnote",this.Note).subscribe(
    data=> {
      console.log(data);
      this.snackbar.open(data.Message,'Undo',{duration:1000})
    });
  }

  setColorToTitle(color)
  {
    console.log(color);
    this.colors=color;
    this.Note.color=color;
  }

}
