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
}
