import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  



  bloodPressureHigh? : number;
  bloodPressureLow? : number;
  sugar? : number;
  uid? : string;
  healthlogsCollection: any;
  userDocument!: AngularFirestoreDocument<any>;

  healthLogs$: Observable<any[]>;
  

  constructor(private route: ActivatedRoute,private firestore: AngularFirestore,){ 
    this.uid = this.route.snapshot.queryParamMap.get('uid') || '';
    //this.healthLogs$ = this.firestore.collection('users').doc(this.uid).collection('healthlogs')
    this.healthlogsCollection = this.firestore.collection(`users/${this.uid}/healthlogs`);

    // Fetch health logs as an Observable
    this.healthLogs$ = this.healthlogsCollection.valueChanges();
    this.healthlogsCollection = this.firestore.collection('healthlogs');
}

  ngOnInit(): void{
    this.uid = this.route.snapshot.queryParamMap.get('uid') || '';
    console.log("Users uid received:",this.uid); 

 }
 /*above three attributes will be displayed with value when onsubmit button is executed */
  onSubmit(){
    console.log("BP High: ", this.bloodPressureHigh);
    console.log("BP Low: ", this.bloodPressureLow);
    console.log("Sugar: ", this.sugar);

    let document = {
      'bloodPressureHigh': this.bloodPressureHigh,
      'bloodPressureLow': this.bloodPressureLow,
      'sugar': this.sugar,
      'createdOn': new Date()
    }
    // Reference the user's document
    this.userDocument = this.firestore.doc(`users/${this.uid}`);

    // Add the subcollection 'healthlogs' to the user's document
    this.userDocument.collection('healthlogs').add(document)
      .then(() => {
        console.log("Health details saved successfully");

    //this.firestore.collection = this.db.collection('/users', (ref: { where: (arg0: string, arg1: string, arg2: (arg0: string, arg1: string, userId: any) => void) => number; }) => ref.where('uid', '==', this.userId)),  
    //this.firestore.collection('users').doc(this.uid).collection('healthlogs').add(document);
    //console.log("Health details Saved");
    //const userDocumentRef = this.firestore.doc(`users/${this.uid}`);

    // Add the subcollection 'healthlogs' to the user's document
    //this.firestore.collection(`users/${this.uid}/healthlogs`)
    //.add(document)
      //.then(() => {
     //   console.log("Health details saved successfully");

    this.bloodPressureHigh = 0;
    this.bloodPressureLow = 0;
    this.sugar = 0;




    
  //userId(arg0: string, arg1: string, userId: any) {
  //  throw new Error('Method not implemented.');
  //}



  }).catch((error) => {
    console.error("Error saving health details:", error);
  });
}
}



