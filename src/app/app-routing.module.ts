import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { GruadGuard } from './Gruads/gruad.guard';
import { HomeComponent } from './Components/home/home.component';
import { DetailsComponent } from './Components/details/details.component';
import { CategoriesComponent } from './Components/categories/categories.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full' },
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', canActivate:[GruadGuard], component:HomeComponent},
  {path:'details/:id', canActivate:[GruadGuard], component:DetailsComponent},
  {path: 'category/:cat', canActivate:[GruadGuard], component:CategoriesComponent},
  {path:'**', component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
