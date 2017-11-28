import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from 'app/DashBoard/dashboard.component';
import { ItemsComponent } from 'app/items/items.component';
import { AddItemsComponent } from 'app/addItem/additem.component';

const Routes: Routes = [
    { path: 'box', component: DashboardComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'addItems', component: AddItemsComponent },
    { path: '**', pathMatch:'full', redirectTo: 'box' },
    
   
]; 

export const appRouting:ModuleWithProviders = RouterModule.forRoot(Routes,{useHash:false});