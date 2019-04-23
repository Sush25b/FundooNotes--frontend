//service =====================>to reload dialogbox-->Note variable of For loop 
//service is b/w addnote Component-->close() 
    //and dialogbox 
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CurrentnoteService
 {
  // private messageSource = new BehaviorSubject<any>("default");
  private messageSource = new BehaviorSubject<[]>( [] );
  currentnote =this.messageSource.asObservable();

  constructor( private http: HttpService) { }

  getAllNotes()
  {
    this.http.getRequest("/note/getAlls"+"?trash=false&archive=false").subscribe(
       (response)=> 
       {
         console.log("sucessfully get notes",response),
        //this.currentnote =response;
        this.messageSource.next(response)
       },
       (error)=> 
       {
            console.log("error",error);            
       } 
    )
  }

  // changeMessage(message: any)
  // {
  //    this.messageSource.next(message)
  // }
}


