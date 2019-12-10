import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TodoService } from '../service/todo.service';
import { map, catchError } from 'rxjs/operators';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TestguardGuard implements CanActivate {

  constructor(private todoService: TodoService) { }

  canActivate(): Observable<boolean> {
    // se ho più di 6 elementi in lista non potrò andare ad aggiungere nuovi Todo
    return this.todoService.getTodos()
      .pipe(
        map(risp => {
          const val: boolean = risp.length < 6;
          console.log('navigo...');
          if (!val) {
            alert('Numero massimo di elementi raggiunto');
          }
          return val;
        }),
        catchError(() => {
          console.log('errore di navigazione');
          return of(false);
        })
      );
    // return false; // tutto negato
    // return true; // sempre concesso
  }

}
