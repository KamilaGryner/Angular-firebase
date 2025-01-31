import { Component, OnInit } from '@angular/core';
import { Campaign } from '../models/campaign';
import { CampaignsService } from '../services/campaigns.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,  // Angular 19 Standalone API
})
export class MainComponent implements OnInit{
  campaigns: Campaign[] = [];
  newCampaign: Campaign = {
    id:'',
    name:'Wiosenna Wyprzedaż Obuwia',
    keywords:'buty sportowe, sandały damskie, obuwie trekkingowe',
    bidAmount:2,
    campaignFund:1000,
    status:false,
    town:'Warszawa',
    radius: 15
  };
  constructor(private campaignsService: CampaignsService){}
  ngOnInit(){
    this.campaignsService.getData().subscribe((data: Campaign[])=>{
      this.campaigns = data;

    })
  }

  onSubmit(){

    if(this.newCampaign.name && this.newCampaign.keywords && this.newCampaign.bidAmount && this.newCampaign.campaignFund && this.newCampaign.status && this.newCampaign.name && this.newCampaign.town&& this.newCampaign.radius >0){
    this.campaignsService.saveData(this.newCampaign);
    console.log('Kampania zapisana', this.newCampaign);
    //clearing form
    this.newCampaign = {
    id:'',
    name:'Wiosenna Wyprzedaż Obuwia',
    keywords:'buty sportowe, sandały damskie, obuwie trekkingowe',
    bidAmount:2,
    campaignFund:1000,
    status:false,
    town:'Warszawa',
    radius: 15
      }
    } else{
      alert('Fill in the gaps');
    }
  }

  
  onDelete(campaign: Campaign){
    const campaignId = campaign.id;
    if(campaignId){
      this.campaignsService.deleteData(campaignId);
      this.campaigns = this.campaigns.filter(item=>item.id != campaignId);
    }else{
      console.log("Campaign id not recognised");
    } 
  }


  onRadiusClick(campaign: Campaign){
    const newRadius = prompt("Enter new keywords:", String(campaign.radius));
    if(newRadius != null){
      campaign.radius =Number(newRadius);
      this.campaignsService.updateData(campaign);
    }
  }
  onTownClick(campaign: Campaign){
    const newTown = prompt("Enter new name:", campaign.town);
    if(newTown != null){
      campaign.town =newTown;
      this.campaignsService.updateData(campaign);
    }
  }

  onStatusClick(campaign: Campaign){
    const newStatus = prompt("Enter new name:", String(campaign.status));
    if(newStatus != null){
      campaign.status = Boolean(newStatus);
      this.campaignsService.updateData(campaign);
    }
  }

  onCampaignFundClick(campaign: Campaign){
    const newCampaignFund = prompt("Enter new keywords:", String(campaign.campaignFund));
    if(newCampaignFund != null){
      campaign.campaignFund =Number(newCampaignFund);
      this.campaignsService.updateData(campaign);
    }
  }
  onBidAmountClick(campaign: Campaign){
    const newBidAmount = prompt("Enter new keywords:", String(campaign.bidAmount));
    if(newBidAmount != null){
      campaign.bidAmount =Number(newBidAmount);
      this.campaignsService.updateData(campaign);
    }
  }
  onKeywordsClick(campaign: Campaign){
    const newKeywords = prompt("Enter new keywords:",campaign.keywords);
    if(newKeywords != null){
      campaign.keywords =newKeywords;
      this.campaignsService.updateData(campaign);
    }
  }
  onNameClick(campaign: Campaign){
    const newName = prompt("Enter new name:", campaign.name);
    if(newName != null){
      campaign.name =newName;
      this.campaignsService.updateData(campaign);
    }
  }
}
