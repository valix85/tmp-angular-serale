import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nxt-root',
  templateUrl: './app.component.html',
  /*
  template: `
  <h1>{{titolo}}</h1>
  <p>lorem ipsum dolor...</p>`,
  */
  styleUrls: ['./app.component.css']
  // styles: [``],
})
export class AppComponent implements OnInit {
  titolo = 'Lista della spesa';
  constructor() { }
  ngOnInit() { }
}
