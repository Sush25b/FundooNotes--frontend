import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  private f:string="logt";
  private log:string="log";
  n:any=[];
  
  constructor() { }

  ngOnInit() 
  {
    var ar=['one', 'two']
    ar[ar.length] = 'five';
    console.log( ar ); 
    this.n=ar;
    console.log(this.n);

    

  }

}
