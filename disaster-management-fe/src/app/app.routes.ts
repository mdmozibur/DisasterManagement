import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DonationComponent } from './donation/donation.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CrisisEditComponent } from './crisis-edit/crisis-edit.component';
import { VolunteerEditComponent } from './volunteer-edit/volunteer-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent},
    { path: 'donation', component: DonationComponent},
    { path: 'crisis', component: CrisisEditComponent, data: { path: 'root' }},
    { path: 'volunteer', component: VolunteerComponent},
    { path: 'inventory', component: InventoryComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'account', component: ProfileComponent},
    { 
        path: 'admin', 
        component: AdminComponent,
        children : [
            { path : 'volunteer', component : VolunteerEditComponent},
            { path : 'crisis', component : CrisisEditComponent, data: { path: 'admin' }},
            { path: '', redirectTo: 'volunteer', pathMatch: 'full' } // default sub-route
        ]
    },
];
