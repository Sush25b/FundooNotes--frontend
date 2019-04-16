//service =====================>b/w side-nav    labels ---->to---->label (i.e to get particular label Notes)
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class SearchService 
{
    private messageSource = new BehaviorSubject<any>("default");
    searchtext =this.messageSource.asObservable();
  
    constructor() { }
  
    changeMessage(text: any)
    {
       this.messageSource.next(text)
    }
}
