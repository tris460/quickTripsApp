import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth'; //"@angulat/fire/auth"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider())
  }
  AuthLogin(provider:any) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result)=>{
      console.log('Logged in succesfull');
      console.log(result);
    })
    .catch((error)=> {
      console.log(error);
    })
  }
}
