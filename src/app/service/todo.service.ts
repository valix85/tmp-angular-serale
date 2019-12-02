import { Injectable } from '@angular/core';
import { todosMock } from '../model/todos.mock';
import { Todo } from '../model/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    //return [...todosMock];
    return this.http.get<Todo[]>('http://localhost:3000/todo/');
  }

  getTodo(id: number): Todo {
    return todosMock.find(el => el.id === id);
  }

  addTodo(item: Todo) {
    todosMock.push(item);
  }

  updateTodo(item: Todo) {
    const idx = todosMock.findIndex(el => el.id === item.id);
    todosMock[idx] = {...item};
  }
}
