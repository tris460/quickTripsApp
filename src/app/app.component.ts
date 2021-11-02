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
    signUp.style.zIndex = '0';
    logIn.style.zIndex = '1';
    signUp.style.transition = 'all 2s ease';
    logIn.style.transition = 'all 2s ease';
    signUp.style.transform = 'translate(100%, 0%)';
    logIn.style.transform = 'translate(100%, 0%)';
  }
  changePositionLogIn() {
    const signUp = document.getElementById('sing-up-front') || document.createElement('div');
    const logIn = document.getElementById('log-in-front') || document.createElement('div');
    signUp.style.zIndex = '1';
    logIn.style.zIndex = '0';
    signUp.style.transition = 'all 2s ease';
    logIn.style.transition = 'all 2s ease';
    signUp.style.transform = 'translate(0%, 0%)';
    logIn.style.transform = 'translate(0%, 0%)';
  }
}
