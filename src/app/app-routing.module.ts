import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageComponent } from './storages/storage.component';
import { ObjectsComponent } from './objects/objects.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { LoggedInGuard } from './login/logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: '/objects', pathMatch: 'full' },
  { path: 'objects', component: ObjectsComponent, canActivate: [LoggedInGuard]},
  { path: 'storages', component: StorageComponent, canActivate: [LoggedInGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
