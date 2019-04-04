import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { decode } from 'punycode';
import { Response } from 'selenium-webdriver/http';
 import { DataService} from '../../app/service/data.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  getlabels:any;
  labelnotes:String;

  message: String;

  constructor(private data:DataService,private router: Router, private formBuilder: FormBuilder, private http: HttpService, private snackbar: MatSnackBar) { }
  
  ngOnInit() 
  {this.getLabel();
    
    this.data.currentMessage.subscribe(

      (message)=>{
        this.message =message
      }
    )
  }

  getLabel()
  {
    this.http.getRequest("/label/getAlls",).subscribe(

      (response)=> {

       // this.data= response('body'),
        //console.log("data-->",this.data)
        this.getlabels =response;
        console.log("got labels successfully",this.getlabels);
      // if(response.body.status===402)
      // {
      //   this.snackbar.open(response.body.Message,'Undo',{duration:1000})
      // }
       },
       (error)=> {
            console.log("error",error);            
       } 
    )
  }

  onNotes(labelId)
  {
    this.http.getRequest("/label/getLabelNote?labelId="+labelId).subscribe
    (
      (response)=> 
      {
        console.log("sucessfully-->notes of label got",response),
      // this.data= response('body'),
       //console.log("data-->",this.data)
       this.labelnotes =response;
       
     // if(response.body.status===402)
     // {
     //   this.snackbar.open(response.body.Message,'Undo',{duration:1000})
     // }
      },
      (error)=> {
           console.log("error",error);            
      } 
   )

   this.data.changeMessage(this.labelnotes)
  }

}
