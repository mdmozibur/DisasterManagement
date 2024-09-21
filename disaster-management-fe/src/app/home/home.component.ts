import { Component, ViewChild } from '@angular/core';
import { DonationComponent } from "../donation/donation.component";
import { CrisisComponent } from "../crisis/crisis.component";
import { VolunteerComponent } from "../volunteer/volunteer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DonationComponent, CrisisComponent, VolunteerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  
}
