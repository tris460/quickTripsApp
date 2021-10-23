import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebaseProyect';
  productList: AngularFireList<any>;

  constructor(public firebase:AngularFireDatabase){
    this.productList = this.firebase.list('product');
  }

  addProduct() {
    this.productList.push({
      name: 'Coca-Cola',
      price: 10
    })
  }
}
