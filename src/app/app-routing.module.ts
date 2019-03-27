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
                  {path:'archive',component:NoteComponent},
                  {path:'bin',component:DashboardComponent},
                  {path:'getnotes',component:DashboardComponent}]
  },
  {path: 'addnote',component:AddNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
