import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').valueChanges({ idField: 'id' });
  }

  addProduct(product: Product) {
    return this.firestore.collection('products').add(product);
  }
}
