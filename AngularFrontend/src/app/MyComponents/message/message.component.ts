import { Component, OnInit, Input} from '@angular/core';
import { Message } from 'src/app/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message:Message;  
   
  constructor() { }

  ngOnInit(): void {
  }

}
