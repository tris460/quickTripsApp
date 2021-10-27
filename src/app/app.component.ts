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
  product: Array<any>;
  productForm : {
    $key?: string,
    name: string,
    branch: string,
    category: string,
    price: number,
    lot: number,
    size: string,
  }

  constructor(public firebase:AngularFireDatabase){
    this.productForm = {
      $key: '',
      name: '',
      branch: '',
      category: '',
      price: 0,
      lot: 0,
      size: ''
    }
    // Create a table in the DB
    this.productList = this.firebase.list('product');
    this.product = [];
    // Get the products registred
    this.productList.snapshotChanges().subscribe(item => {
      this.product = [];
      item.forEach(producto => {
        let x: any = producto.payload.toJSON();
        x['$key'] = producto.key;
        this.product.push(x);
      });
      console.log('Products:', this.product);
    });
  }

  saveProduct() {
    if(this.productForm.$key === '') { // If is a new product
      delete this.productForm.$key; // Delete de key before add a product
      this.productList.push(this.productForm);
      this.clearForm();
      alert('Product saved');
    } else { // If the product is being updated
      const keyTemp = this.productForm.$key ? this.productForm.$key : '';
      delete this.productForm.$key; // Delete de key because we can't update a product if it has a key
      this.productList.update(keyTemp, this.productForm);
      this.clearForm();
      alert('Product updated');
    }
  }
  clearForm() {
    this.productForm = {
      $key: '',
      name: '',
      branch: '',
      category: '',
      price: 0,
      lot: 0,
      size: ''
    }
  }
  editProduct(productToEdit: any) {
    this.productForm = productToEdit;
  }
  removeProduct(key: any) {
    this.productList.remove(key);
  }
}
