import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class DataService
 {
  private messageSource = new BehaviorSubject<any>("default");
  currentMessage =this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: any)
  {
     this.messageSource.next(message)
  }
}
