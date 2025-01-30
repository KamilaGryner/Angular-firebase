import { Component } from '@angular/core';
import { Campaign } from '../models/campaign';
import { CampaignsService } from '../services/campaigns.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,  // Angular 19 Standalone API
})
export class MainComponent {
  newCampaign: Campaign = {
    name: '',
    keywords: '',
    bidAmount: 0,
    campaignFund: 0,
    status: '',
    town: '',
    radius: 0
  };
  constructor(private campaignsService: CampaignsService){}

  onSubmit(){
    this.campaignsService.saveData(this.newCampaign);
    console.log('Kampania zapisana', this.newCampaign);
    //clearing form
    this.newCampaign = {
    name: '',
    keywords: '',
    bidAmount: 0,
    campaignFund:0,
    status:'',
    town:'',
    radius: 0
    }
  }
}
