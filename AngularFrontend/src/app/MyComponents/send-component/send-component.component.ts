import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { GlobalConstants } from 'src/app/GlobalComponents';
@Component({
  selector: 'app-send-component',
  templateUrl: './send-component.component.html',
  styleUrls: ['./send-component.component.css']
})
export class SendComponentComponent implements OnInit {
  @Output() messageSend:EventEmitter<string> = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit(): void {}

  async onClick(message:string) {
    //console.log(GlobalConstants.user.name)
    let url = `${GlobalConstants.apiURL}/chat/${GlobalConstants.user.name}/${GlobalConstants.user.phone}/${GlobalConstants.receiver.name}/${GlobalConstants.receiver.phone}`;
    let ret = await fetch(url, {
        method: "POST",
        body: JSON.stringify({input:message, id:"1"}),
    }).then((res)=> res.json()).then((res)=> {
   });
  }
}
