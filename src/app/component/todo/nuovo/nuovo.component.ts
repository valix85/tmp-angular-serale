import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { NgForm } from '@angular/forms';
import { Todo } from 'src/app/model/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'nxt-nuovo',
  templateUrl: './nuovo.component.html',
  styleUrls: ['./nuovo.component.css']
})
export class NuovoComponent implements OnInit, OnChanges {

  todo: Todo = new Todo();
  @Input() value: Todo;
  @Output() todoUpdateEvent: EventEmitter<any> = new EventEmitter();

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    console.log('nxt-nuovo init');
    if (this.value) {
      this.todo = this.value;
    } else {
      this.todo.qta = 1;
    }
  }

  ngOnChanges() {
    console.log('nxt-nuovo change');
    if (this.value) {
      this.todo = this.value;
    } else {
      this.todo.qta = 1;
    }
  }


  saveTodo(form: NgForm): void {
    if (form.value.id > 0) {
        console.log('AGGIORNO TODO', form.value.id);
        this.updateTodo(form.value);
    } else {
      console.log('AGGIUNGO TODO');
      this.addTodo(form.value);
    }
    // reset form
  }

  addTodo(item: Todo): void {
    this.todoService.getTodos().subscribe(
      ok => {
        const newId = 1 + Math.max.apply(Math, ok.map(o => o.id ));
        item.id = newId;
        item.complete = false;
        console.log('Todo da salvare', item);
        this.todoService.addTodo(item).subscribe(
          risp => {
            console.log('Todo Salvato', risp);
            this.router.navigateByUrl('/');
          },
          error => {
            console.log(error);
            alert('Errore di comunicazione');
          }
        );

      }
    );
  }

  updateTodo(item: Todo): void {
    console.log(item);
    this.todoService.updateTodo(item).subscribe(
      risp => {
        console.log(risp);
        this.todoUpdateEvent.emit({action: 'UPDATE', state: 'OK', value: item});
      }
    );
    // this.router.navigateByUrl('/'); //versione facile e diretta
  }



} // end class
