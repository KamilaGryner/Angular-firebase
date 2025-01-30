import { Injectable } from '@angular/core';
import {Campaign} from '../models/campaign';
import {Firestore, collection, addDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  constructor(private firestore: Firestore) { }
  saveData(data:Campaign){
    const collectionInstance = collection(this.firestore, 'campaign');
    addDoc(collectionInstance, data)
    .then(()=>{
      console.log("Data saved successfully");
      console.log(data);
    }).catch((error)=>{
      console.log("error", error);
    })
  }
}
