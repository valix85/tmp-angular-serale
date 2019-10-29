import { Component } from '@angular/core';
import { todosMock } from './model/todos.mock';
import { Todo } from './model/todo';

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
export class AppComponent {
  daFare: Todo[] = todosMock;
  titolo = 'Titolo Prima Applicazione';

  getQta(): number {
    const daCompletare: Todo[] = this.daFare.filter(el => !el.complete);
    return daCompletare.length;
  }

  metodo(item: Todo): void {
    alert(item.label);
  }

}
