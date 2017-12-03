import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from 'app/DashBoard/dashboard.component';
import { ItemsComponent } from 'app/items/items.component';
import { AddItemsComponent } from 'app/addItem/additem.component';
import { EditItemsComponent } from 'app/editItem/edititem.component';
import { InscreaseItemsComponent } from 'app/increaseItem/increaseItem.component';
import { AddCartComponent } from 'app/addCart/addcart.component';
import { QRCode } from 'app/qrcode/qrcode.component';
import { UserLoginComponent } from 'app/ui/user-login/user-login.component';

import { AuthGuard } from 'app/core/auth.guard';
import { CoreModule } from 'app/core/core.module';
import { SplashComponent } from 'app/splashScreen/splashscreen.component';

const Routes: Routes = [
    { path: 'login', component: UserLoginComponent },
    { path: 'box', component: DashboardComponent},
    { path: 'items', component: ItemsComponent},
    { path: 'addItems', component: AddItemsComponent},
    { path: 'addcartItems', component: AddCartComponent},
    { path: 'qrcode', component: QRCode},
    { path: 'editItems/:id', component: EditItemsComponent},
    { path: 'IncreaseItems/:id', component: InscreaseItemsComponent},
    { path: '**', pathMatch:'full', redirectTo: 'box' },
    // { path: 'login', component: UserLoginComponent },
    // { path: 'box', component: DashboardComponent, canActivate: [AuthGuard] },
    // { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
    // { path: 'addItems', component: AddItemsComponent, canActivate: [AuthGuard] },
    // { path: 'addcartItems', component: AddCartComponent, canActivate: [AuthGuard] },
    // { path: 'qrcode', component: QRCode, canActivate: [AuthGuard] },
    // { path: 'editItems/:id', component: EditItemsComponent, canActivate: [AuthGuard] },
    // { path: 'IncreaseItems/:id', component: InscreaseItemsComponent, canActivate: [AuthGuard] },
    // { path: '**', pathMatch:'full', redirectTo: 'box' }
    
    
   
]; 

export const appRouting:ModuleWithProviders = RouterModule.forRoot(Routes,{useHash:false});