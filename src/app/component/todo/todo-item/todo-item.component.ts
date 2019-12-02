import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/model/todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'nxt-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  todo: Todo;
  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.todo = this.todoService.getTodo(parseInt(id, 10));
  }

  doUpdate(evento: any): void {
    console.log(evento);
    if (evento.state === 'OK') {
      this.router.navigateByUrl('/');
    }
  }

}
