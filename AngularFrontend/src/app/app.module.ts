import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendComponentComponent } from './MyComponents/send-component/send-component.component';
import { MessagesComponent } from './MyComponents/messages/messages.component';
import { MessageComponent } from './MyComponents/message/message.component';
import { ContactsComponent } from './MyComponents/contacts/contacts.component';
import { ContactComponent } from './MyComponents/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    SendComponentComponent,
    MessagesComponent,
    MessageComponent,
    ContactsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
