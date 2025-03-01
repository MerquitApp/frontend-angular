import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BoardComponent } from './board/board/board.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/board', pathMatch: 'full' },
  { path: '**', redirectTo: '/board' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
