import { outputAst } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { GlobalConstants } from 'src/app/GlobalComponents';
import {Contact} from "../../Contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() contact:Contact;
  constructor() { }

  ngOnInit(): void {
  }
  
  onClick() {
    GlobalConstants.receiver = {
      name: this.contact.name,
      phone: this.contact.phone
    }
  }
}
