import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nxt-todo-elenco',
  templateUrl: './todo-elenco.component.html',
  styleUrls: ['./todo-elenco.component.css']
})
export class TodoElencoComponent implements OnInit {

  daFare: Todo[] = [];

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(
      risp => {this.daFare = risp; },
      err => {console.error(err); },
      () => {console.log('finito'); }
    );
    console.log('nxt-todo-elenco init');
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


  info(item: Todo) {
      if (item && item.id != null) {
        this.router.navigateByUrl('todo/' + item.id);
      }
  }

} // end class
