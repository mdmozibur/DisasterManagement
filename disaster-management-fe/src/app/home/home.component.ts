import { Component, ViewChild } from '@angular/core';
import { DonationComponent } from "../donation/donation.component";
import { VolunteerComponent } from "../volunteer/volunteer.component";
import { CrisisEditComponent } from '../crisis-edit/crisis-edit.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DonationComponent, CrisisEditComponent, VolunteerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  
}
