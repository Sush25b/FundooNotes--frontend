import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/login.model';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  a:any;
  b:any;
  // post request                                                                               

  //login                                                                               
  public postRequest(url, data): Observable<any>
  {
    console.log("8888888888888888888888888");
    // const headers= new HttpHeaders({'jwtToken': localStorage.getItem("token")});

    // console.log(headers+"@@@@@@@@@");
    // return this.http.post(this.baseUrl + url, data,{headers:headers});
    return this.http.post(this.baseUrl + url, data);
  }


  // public postRequestT(url,data): Observable<any>
  // {
  //   console.log("1111111111111111111"+localStorage.getItem('token'));
  //   //,observe:'response'
  //   return this.http.post(this.baseUrl + url,data,{headers:new HttpHeaders().set("jwtToken",localStorage.getItem('token'))}
  //   )

  //get all notes
  public putReq(url): Observable<any>
  {
    console.log(url+"  **ssdsd**  "+localStorage.getItem('token'));

    return this.http.put(this.baseUrl + url,"",{headers:new HttpHeaders().set("jwtToken",localStorage.getItem('token'))}
    )
  }

  //get all notes
  public postRequestT(url,data): Observable<any>
  {
    console.log("********  "+localStorage.getItem('token'));
    //,observe:'response'

    return this.http.post(this.baseUrl + url,data,{headers:new HttpHeaders().set("jwtToken",localStorage.getItem('token'))}
    )
  }

  public putRequest(url):Observable<any>
  {
  return this.http.post(this.baseUrl + url, {ResponseType: 'test'})
  }
  
  public getRequest(url): Observable<any>
   {
    return this.http.get(environment.baseUrl + url,{ headers: new HttpHeaders().set("jwtToken", localStorage.getItem('token')) }
      );
   }

   
  //old method i used
  // postForm(userData):Observable<any>{
  //   console.log(userData);
  //   return this.http.post(this.baseUrl+'/login',userData)
  // }
}


// console.log("8888888888888888888888888");

//     // const headers= new HttpHeaders({'jwtToken': localStorage.getItem("token")});

//     // console.log(headers+"@@@@@@@@@");
//     // return this.http.post(this.baseUrl + url, data,{headers:headers});
//     return this.http.post(this.baseUrl + url, data,{headers:new HttpHeaders().set("jwtToken",localStorage.getItem("token")),
//     observe:'response'});