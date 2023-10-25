import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'', component: SigninComponent}, //signin comp will be shown first
  {path: 'register', component: RegisterComponent},
  
  {path:'home', component: HomeComponent},
  {path:'about', component: AboutComponent} //path has been given to components
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
