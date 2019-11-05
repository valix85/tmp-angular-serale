import { Injectable } from '@angular/core';
import { todosMock } from '../model/todos.mock';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Todo[] {
    return todosMock;
  }
}
