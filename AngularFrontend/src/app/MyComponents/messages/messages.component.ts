import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChildren, QueryList } from '@angular/core';
import {Message} from "../../Message";
import { GlobalConstants } from 'src/app/GlobalComponents';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Output() scrollToBottom: EventEmitter<void> = new EventEmitter();
  messages:Message[];
  hostname: string;
  prev:number
  constructor() {
    this.messages = []
    this.prev = 0;
  }


  async requestMessages() {
    let ret;
    ret = await fetch(`${GlobalConstants.apiURL}/chat/${GlobalConstants.user.name}/${GlobalConstants.user.phone}/${GlobalConstants.receiver.name}/${GlobalConstants.receiver.phone}`, {
      method: "POST",
      body: JSON.stringify({id:"0"}),
    }).then((res)=> res.json()).then((res)=> { 
              return res;       
    });
    return ret;
  }

  async check() {
    if (GlobalConstants.receiver.name !== "") {
      let res = await this.requestMessages();
      if ( res.length !== this.prev ) {
        this.messages = []
        for (let key in Object.entries(res)) {
          let temp = {body:res[key][2], time:res[key][0], sent:true};
          if (res[key][1] === 2) {
            temp.sent = false;
          }
          this.messages.push(temp);
        }
        console.log(this.prev, res.length)
        this.prev = res.length
        this.scrollToBottom.emit();
      }
    }
  }


  ngOnInit(): void {
      const interval = setInterval(this.check.bind(this), 1000);
      //this.check();
  }

//   @ViewChildren("messageContainer") messageContainers: QueryList<ElementRef>;

// ngAfterViewInit() {
//   this.scroll(); // For messsages already present
//   this.messageContainers.changes.subscribe((list: QueryList<ElementRef>) => {
//     console.log("changes");
//     this.scroll(); // For messages added later
//   });


// }



}
