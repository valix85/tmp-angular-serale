import { Injectable } from '@angular/core';
import { todosMock } from '../model/todos.mock';
import { Todo } from '../model/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, tap, retry, retryWhen, delayWhen, finalize, count } from 'rxjs/operators';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    // return [...todosMock];
    return this.http.get<Todo[]>('http://localhost:3000/todo/');
  }

  getTodo(id: number): Observable<Todo> {
    // return todosMock.find(el => el.id === id);
    return this.http.get<Todo>('http://localhost:3000/todo/' + id);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(
      'http://localhost:3000/todo/' + id
      );
  }

  addTodo(item: Todo): Observable<Todo> {
    // todosMock.push(item);
    return this.http.post<Todo>(
      'http://localhost:3000/todo/',
      item
    ).pipe(
      /*
      tap(
        (el) => console.info('HTTP OK', el),
        (err) => console.error('HTTP KO', err),
        () => console.log('HTTP COMPLETE')
      ),
      */
      catchError(this.handleError),
      // retry(2), // prova n volte
      retryWhen(error => {
        return error.pipe(
          delayWhen( () => timer(1000)),
          tap(() => console.log('retrying...'))
        )
      })
    );
  }

  updateTodo(item: Todo): Observable<Todo> {
    /*
    const idx = todosMock.findIndex(el => el.id === item.id);
    todosMock[idx] = {...item};
    */
    return this.http.put<Todo>(
      'http://localhost:3000/todo/' + item.id,
      item
      );
  }


  handleError(error: any) {
    console.log('Errore intercettato');
    return throwError('Impossibile salvare l\'oggetto Todo');
  }
}
