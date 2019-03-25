import { Component, OnInit } from '@angular/core';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { CreateNoteModel } from '../model/create-note.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
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

  //addnoteForm
  //  CreateNoteModel
  Note: CreateNoteModel=new CreateNoteModel();

  addnoteForm = this.formBuilder.group({
    // emailid: [this.user.emailid, [Validators.required, Validators.email]]
    title:[this.Note.title],
    description:[this.Note.description]
  })


  title = new FormControl('')
  description = new FormControl('')

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

    console.log(this.addnoteForm.value);
    
    this.http.postRequestT("/note/createnote",this.addnoteForm.value).subscribe(
    data=> {
      console.log(data);
      this.snackbar.open(data.Message,'Undo',{duration:1000})
    });
  }

  
}
