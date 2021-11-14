import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebaseI from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // For the register section
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  userList: AngularFireList<any>;
  // To log in
  emailLogIn: string;
  pass: string;
  users: Array<any>;
  
  constructor(public firebase:AngularFireDatabase, private router:Router, public authFirebase:AngularFireAuth) { 
    this.userList = this.firebase.list('user');
    this.username = '';
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
    this.emailLogIn = '';
    this.pass = '';
    this.users = [];

    // Get users registred
    this.userList.snapshotChanges().subscribe(user => {
      user.forEach(u => {
        let x = u.payload.toJSON();
        this.users.push(x);
      });
    });
  }

  ngOnInit(): void {
  }
  addUser() {
    if(this.validateFieldsSignIn()) {
      this.userList.push({
        username: this.username,
        email: this.email,
        password: this.password
      });
      alert('User added correctly');
      this.clearForm();
    }
  }
  logIn() {
    const errorLogIn = document.getElementById('error__logIn') || document.createElement('p');
    const correctUser = this.users.filter(u => 
      u.email === this.emailLogIn && u.password === this.pass);
    if(correctUser.length > 0) {
      this.router.navigateByUrl('/map');
    } else {
      errorLogIn.style.display = 'block';
    }
  }
  signInFacebook() {
    this.authFirebase.auth.signInWithPopup(new firebaseI.auth.FacebookAuthProvider())
  }
  loginFacebook() {
    const provider = new firebaseI.auth.FacebookAuthProvider();
    this.authFirebase.auth.signInWithPopup(provider);
  }
  clearForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }
  validateFieldsSignIn() {
    const errorName = document.getElementById('errorName') || document.createElement('p');
    const errorEmailReq = document.getElementById('errorEmailReq') || document.createElement('p');
    const errorEmailChar = document.getElementById('errorEmailChar') || document.createElement('p');
    const errorPassReq = document.getElementById('errorPassReq') || document.createElement('p');
    const errorPassChar = document.getElementById('errorPassChar') || document.createElement('p');
    const errorRepPassReq = document.getElementById('errorRepPassReq') || document.createElement('p');
    const errorRepPassChar = document.getElementById('errorRepPassChar') || document.createElement('p');
    const validateEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const validatePass = /^.{8,20}$/;
    let validator = true;

    if(this.username === '') {
      errorName.style.display = 'block';
      validator = false;
    } else {
      errorName.style.display = 'none';
    }

    if(this.email === '') {
      errorEmailReq.style.display = 'block';
      validator = false;
    } else {
      errorEmailReq.style.display = 'none';
    }

    if(validateEmail.test(this.email)) {
      errorEmailChar.style.display = 'none';
    } else {
      errorEmailChar.style.display = 'block';
      validator = false;
    }

    if(this.password === '') {
      errorPassReq.style.display = 'block';
      validator = false;
    } else {
      errorPassReq.style.display = 'none';
    }

    if(validatePass.test(this.password)) {
      errorPassChar.style.display = 'none';
    } else {
      errorPassChar.style.display = 'block';
      validator = false;
    }

    if(this.repeatPassword === '') {
      errorRepPassReq.style.display = 'block';
      validator = false;
    } else {
      errorRepPassReq.style.display = 'none';
    }

    if(this.password === this.repeatPassword) {
      errorRepPassChar.style.display = 'none';
    } else {
      errorRepPassChar.style.display = 'block';
      validator = false;
    }

    if(validator) {
      return validator;
    } else {
      return validator;
    }
  }

  // Styes
  changePositionSignUp() {
    const signUp = document.getElementById('sign-up-front') || document.createElement('div');
    const logIn = document.getElementById('log-in-front') || document.createElement('div');
    signUp.style.zIndex = '0';
    logIn.style.zIndex = '1';
    signUp.style.transition = 'all 2s ease';
    logIn.style.transition = 'all 2s ease';
    signUp.style.transform = 'translate(100%, 0%)';
    logIn.style.transform = 'translate(100%, 0%)';
  }
  changePositionLogIn() {
    const signUp = document.getElementById('sign-up-front') || document.createElement('div');
    const logIn = document.getElementById('log-in-front') || document.createElement('div');
    signUp.style.zIndex = '1';
    logIn.style.zIndex = '0';
    signUp.style.transition = 'all 2s ease';
    logIn.style.transition = 'all 2s ease';
    signUp.style.transform = 'translate(0%, 0%)';
    logIn.style.transform = 'translate(0%, 0%)';
  }
}
