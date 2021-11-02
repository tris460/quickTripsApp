import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebaseProyect';
  user: string;
  password: string;
  userList: AngularFireList<any>;

  constructor(public firebase:AngularFireDatabase){
    this.userList = this.firebase.list('user');
    this.user = '';
    this.password = '';
  }

  addUser() {
    this.userList.push({
      name: this.user,
      pass: this.password
    })
  }
  changePositionSignUp() {
    const signUp = document.getElementById('sing-up-front') || document.createElement('div');
    const logIn = document.getElementById('log-in-front') || document.createElement('div');
    signUp.style.left = '100%';
    signUp.style.zIndex = '0';
    logIn.style.left = '0%';
    logIn.style.zIndex = '1';
  }
  changePositionLogIn() {
    const signUp = document.getElementById('sing-up-front') || document.createElement('div');
    const logIn = document.getElementById('log-in-front') || document.createElement('div');
    signUp.style.left = '0%';
    signUp.style.zIndex = '1';
    logIn.style.left = '-100%';
    logIn.style.zIndex = '0';
  }
}
