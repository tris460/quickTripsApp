import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent implements OnInit {
  travelList: AngularFireList<any>;
  travel: Array<any>;

  constructor(public firebase:AngularFireDatabase, private router: Router) {
    const userInfo = localStorage.getItem('loggedUser');
    if(!userInfo){
      this.router.navigateByUrl('/login')
    }

    this.travelList = this.firebase.list('travel');
    this.travel = [];

    this.travelList.snapshotChanges().subscribe(item => {
      this.travel = [];
      item.forEach(t => {
        let x = t.payload.toJSON();
        this.travel.push(x);
        console.log(x)
      });
    });
  }

  ngOnInit(){
    
  }
  
  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigateByUrl('/login');
  }

}
