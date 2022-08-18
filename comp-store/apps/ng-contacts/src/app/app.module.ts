import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AddContactComponent } from './comps/add-contact/add-contact.component';
import { ContactsComponent } from './comps/contacts/contacts.component';
import { HeaderComponent } from './comps/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditContactComponent } from './comps/edit-contact/edit-contact.component';
import { MaterialModule } from "@comp-store/material";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    AddContactComponent,
    ContactsComponent,
    HeaderComponent,
    EditContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
