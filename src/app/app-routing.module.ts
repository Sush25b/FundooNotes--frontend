import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { TestComponent } from './test/test.component'
import { DashboardComponent} from './dashboard/dashboard.component';
import { AddNoteComponent} from './add-note/add-note.component';
import { NoteComponent } from './note/note.component';
import { ArchiveComponent } from './archive/archive.component';
import { BinComponent } from './bin/bin.component';
import { GetnoteComponent } from './getnote/getnote.component';
import { LabelComponent } from './../app/label/label.component';

// routing components--> add here Only
const routes: Routes = [
  {path:'',component:TestComponent},
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'user/:token',component:ResetpasswordComponent},
  {path: 'test',component:TestComponent},
  {path: 'dashboard',component:DashboardComponent,
        children:[
                  {path:'archive',component:ArchiveComponent},
                  {path:'bin',component:BinComponent},
                  {path:'',component:GetnoteComponent},
                  {path:'labelnote',component:LabelComponent}]
  },
  {path: 'addnote',component:AddNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
