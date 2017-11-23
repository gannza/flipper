import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from 'app/DashBoard/dashboard.component';

const Routes: Routes = [
    { path: 'box', component: DashboardComponent },
    { path: '**', pathMatch:'full', redirectTo: 'box' }
   
]; 

export const appRouting:ModuleWithProviders = RouterModule.forRoot(Routes,{useHash:false});