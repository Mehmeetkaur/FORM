import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from "firebase/compat/app";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
  
  
})
export class RegisterComponent implements OnInit {

  name?: string;
  email?: string;
  password?: string;
  db: any;

  constructor(
    private authService: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.email || !this.password) {
      console.log('Email and password are required.');
      return;
    }

    console.log("Name: ", this.name);
    console.log("Email: ", this.email);

    this.authService.createUserWithEmailAndPassword(this.email, this.password)
      .then((_userCredential: firebase.auth.UserCredential)=>{
        let user = _userCredential.user;
        let uid = user?.uid;
        console.log("User Created with UID", user?.uid);

        let document = {
          'name': this.name,
          'email': this.email
        }
        
        // Insert user data into the Firestore 'users' collection
        this.firestore.collection = this.db.collection('/users', (ref: { where: (arg0: string, arg1: string, arg2: (arg0: string, arg1: string, userId: any) => void) => number; }) => ref.where('uid', '==', this.userId)),  
        
        this.router.navigate(['/home'], {queryParams:{uid}});
        
          
    })      
      
          
      .catch((error) => {
        console.error("Something went wrong", error);
      });
  }
  userId(_arg0: string, _arg1: string, _userId: any) {
    throw new Error('Method not implemented.');
  }

}

