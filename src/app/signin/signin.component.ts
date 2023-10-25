import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent  { 

  email? : string;
  password? : string;

// Firebase SDK -> get reference of firebase authentication service (user present or not)
  constructor(private authSerive: AngularFireAuth, private router: Router){ }

  ngOnInit(): void{

  }
  onSubmit(){
    console.log("Email: ", this.email);
    console.log("Password: ", this.password);

    


    this.authSerive.signInWithEmailAndPassword(this.email!, this.password!)
    .then((userCredential: firebase.auth.UserCredential)=>{

      let user = userCredential.user;
      let uid = user?.uid;
      console.log("User Sign In with UID", user?.uid);


      this.router.navigate(['/home'], {queryParams:{uid}}); //if user logs in successfully navigate to home
       
    })
    .catch((error)=>{
      console.log("Something went wrong", error); // if user is not present 

    })
    

  



  }
}
