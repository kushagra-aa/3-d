import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeromodleComponent } from './heromodle/heromodle.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RenderComponent } from './render/render.component';
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
  },
  { path: 'render', component: RenderComponent },
  { path: 'hero', component: HeromodleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
