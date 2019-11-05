import { Component, OnInit } from '@angular/core';
// import { todosMock } from './model/todos.mock';
import { Todo } from './model/todo';
import { NgForm } from '@angular/forms';
import { TodoService } from './service/todo.service';

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
  // daFare: Todo[] = todosMock;
  daFare: Todo[];
  titolo = 'Lista della spesa';
  todo: Todo = new Todo();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todo.qta = 1;
    this.daFare = this.todoService.getTodos();
  }

  getQta(): number {
    const daCompletare: Todo[] = this.daFare.filter(el => !el.complete);
    return daCompletare.length;
  }

  cancella(item: Todo): void {
    const result: boolean = confirm('Sicuro di voler cancellare la voce: ' + item.label);
    if (result) {
      // cancello dalla lista, opero sulla lista originale, non su una sua copia!
      // this.daFare = this.daFare.filter(elem => elem !== item);
      const idx = this.daFare.findIndex(elem => elem === item);
      if (idx >= 0) {
        this.daFare.splice(idx, 1);
      }
    }
  } // end cancella

  saveTodo(form: NgForm): void {
    if (form.value.id > 0) {
        // fare update
    } else {
      // fare add
      this.addTodo(form.value);
    }
    // reset form
  }

  addTodo(item: Todo): void {
    const newId = 1 + Math.max.apply(Math, this.daFare.map((o) => o.id ));
    item.id = newId;
    item.complete = false;
    this.daFare.push(item);
  }

}
