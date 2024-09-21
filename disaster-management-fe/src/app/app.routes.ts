import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DonationComponent } from './donation/donation.component';
import { CrisisComponent } from './crisis/crisis.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent},
    { path: 'donation', component: DonationComponent},
    { path: 'crisis', component: CrisisComponent},
    { path: 'volunteer', component: VolunteerComponent},
    { path: 'inventory', component: InventoryComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'account', component: ProfileComponent},
    { 
        path: 'admin', 
        component: AdminComponent,
    },
];
