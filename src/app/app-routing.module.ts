import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NuovoComponent } from './component/todo/nuovo/nuovo.component';
import { TodoItemComponent } from './component/todo/todo-item/todo-item.component';
import { TestguardGuard } from './guards/testguard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'add', component: NuovoComponent, canActivate: [TestguardGuard] },
  {path: 'todo/:id', component: TodoItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
