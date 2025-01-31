import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
   // provideForms(),  
   importProvidersFrom(CommonModule, FormsModule),  
   provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyACIr7wxp_3qvZ8_ZqkRpZRYKyvUOdt6TA",
      authDomain: "angular-firebase-project-d9617.firebaseapp.com",
      projectId: "angular-firebase-project-d9617",
      storageBucket: "angular-firebase-project-d9617.firebasestorage.app",
      messagingSenderId: "108604565039",
      appId: "1:108604565039:web:32d9a65a4ac0048b8608da"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
    
  ]
};
