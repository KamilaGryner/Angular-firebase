import { Injectable, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { Campaign } from '../models/campaign';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private firestore = inject(Firestore);
  private environmentInjector = inject(EnvironmentInjector); // 🔥 Wymusza poprawny Injection Context

  saveData(data: Campaign): Promise<void> {
    return runInInjectionContext(this.environmentInjector, () => { // 🔥 Wymusza Injection Context dla Firestore
      const collectionInstance = collection(this.firestore, 'campaigns');
      return addDoc(collectionInstance, data)
        .then(() => {
          console.log("Data saved successfully", data);
        })
        .catch((error) => {
          console.error("Error saving data:", error);
          throw error;
        });
    });
  }

  getData(): Observable<Campaign[]> {
    return runInInjectionContext(this.environmentInjector, () => { // 🔥 To kluczowa zmiana!
      const collectionRef = collection(this.firestore, 'campaigns');
      return collectionData(collectionRef, { idField: 'id' }) as Observable<Campaign[]>;
    });
  }

  deleteData(id: string){
    const docRef = doc(this.firestore, 'campaigns', id);
    deleteDoc (docRef).then(()=>{
      console.log("campaigns has been deleted");
    }).catch((error)=>{
      console.log('Error', error);
    });
  }

  updateData(campaign: Campaign){
    const{id, ...campaignData} = campaign;
    const docRef = doc(this.firestore, `campaigns/${id}`);

    updateDoc (docRef, campaignData).then(()=>{
      console.log("campaigns has been updated");
    }).catch((error)=>{
      console.log('Error:', error);
    });
  }
}
