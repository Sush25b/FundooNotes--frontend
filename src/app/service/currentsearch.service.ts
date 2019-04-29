import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../service/http.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CurrentsearchService
{
  private messageSource = new BehaviorSubject<[]>([]);
  currentsearch =this.messageSource.asObservable();

  constructor( private http: HttpService) { }

  changeMessage(text: any)
  {
    //  this.messageSource.next(text)
     console.log(text);

     this.http.postReq("/note/search?searchName="+text).subscribe(  
      data=> {
        console.log(data);
        this.messageSource.next(data);
      });
  }
}
