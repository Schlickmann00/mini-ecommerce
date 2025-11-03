import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private currentOrderSubject = new BehaviorSubject<Order | null>(null);
  currentOrder$ = this.currentOrderSubject.asObservable();

  setOrder(order: Order) {
    this.currentOrderSubject.next(order);
  }

  getOrder(): Order | null {
    return this.currentOrderSubject.value;
  }

  clear() {
    this.currentOrderSubject.next(null);
  }
}


