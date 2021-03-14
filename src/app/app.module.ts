import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbActionsModule, NbMenuModule, NbIconModule, NbToggleModule, NbButtonModule, NbCardModule, NbInputModule, NbFormFieldModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RenderComponent } from './render/render.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    RenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbToggleModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
