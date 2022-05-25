import { Component, ElementRef, ViewChild } from '@angular/core';
import { GlobalConstants } from './GlobalComponents';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //@ViewChild('target') private myScrollContainer: ElementRef;

  title = 'myproject';
  
  ngOnInit(): void {
    GlobalConstants.user = {
      name:(localStorage.getItem('username') || ""),
      phone:(localStorage.getItem('usernumber') || "")
    }
    GlobalConstants.receiver = {
      name:"",
      phone:""
    }
  }


  onScroll($element:any) {
    console.log("caught");
    //this.myScrollContainer.nativeElement.scroll({
      //top: this.myScrollContainer.nativeElement.scrollHeight,
      //behavior: 'smooth'
    //});
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
