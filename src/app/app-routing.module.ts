import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/app/home', pathMatch: 'full'

  },
  {
    path: 'app', component: MainComponent, children: [
      { path: 'signin', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'home', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
