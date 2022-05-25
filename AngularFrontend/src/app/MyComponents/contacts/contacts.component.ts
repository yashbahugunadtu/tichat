import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Contact } from "../../Contact"
import { GlobalConstants } from 'src/app/GlobalComponents';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[]
  interval:ReturnType<typeof setInterval>
  constructor() {
    this.contacts = [];
  }

 async request() {
      let ret;
      ret = await fetch(`${GlobalConstants.apiURL}/user/${GlobalConstants.user.name}/${GlobalConstants.user.phone}`, {
          method: "POST",
      }).then((res)=> res.json()).then((res => {
        return res;
      }));
      //console.log(ret);
      return ret;
  }

  async check() {
    let res = await this.request();
    this.contacts.splice(0,this.contacts.length);
    for (let [key, value] of Object.entries(res)) {
        this.contacts.push({name:value as string, phone:key});
    }
  }

  ngOnInit(): void {
    this.interval = setInterval(this.check.bind(this), 1000);
    console.log(this.contacts);    
  }

}
