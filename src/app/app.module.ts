import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RouterModule, Routes, ROUTES, RoutesRecognized} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { NoteComponent } from './note/note.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ArchiveComponent } from './archive/archive.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import { BinComponent } from './bin/bin.component';
import { GetnoteComponent } from './getnote/getnote.component';
import { EditnoteComponent } from './editnote/editnote.component';
import { LabelComponent } from './label/label.component';
import { LabelsComponent } from './labels/labels.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import {     ImageCropperComponent } from 'ng2-img-cropper';

@NgModule({
  declarations: [
    //HttpClient,
   // AppRoutingModule,
    AppComponent,
    TestComponent,
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    DashboardComponent,
    AddNoteComponent,
    NoteComponent,
    ArchiveComponent,
    DialogboxComponent,
    BinComponent,
    GetnoteComponent,
    EditnoteComponent,
    LabelComponent,
    LabelsComponent,
    UserprofileComponent,
    ImageCropperComponent
    
  ],
  imports: [
  HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTooltipModule,

    // RouterModule,
    RouterModule.forRoot([{path:'',component:AddNoteComponent}])
  ],
  exports: [
   // HttpClient


  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[EditnoteComponent]
})
export class AppModule { }
