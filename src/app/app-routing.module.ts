import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    // {
    //     path: 'flipper',
    //     component: WelcomeComponent,
       
    // },
    {
        path: 'login',
        component: LoginComponent,
       
    },
     { path: '**', pathMatch:'full', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})] ,
    exports: [RouterModule]
})

  export class AppRoutingModule {}
