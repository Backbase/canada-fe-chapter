import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { Product } from "../product.model";
import { createOrder, Order } from "../order.model";

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit, OnChanges, OnInit {

  // TODO:
  //   With the right updaters, patchers and selectors, we can do without
  //   1. the `@Input`
  //   2. the `@Output`
  //   3. move the orderMap and it's logic to the store
  @Input() products!: Product[] | null;
  @Output() emitOrders = new EventEmitter<Order[]>();
  ordersMap = new Map<number, Order>;

  // TODO: dataSource should be initialized from the products$ selector, something like:
  //       dataSource = the store's products$
  dataSource: any;
  displayedColumns: string[] = ['sold', 'name', 'cost', 'quantity'];

  // TODO:
  //   1. because you're accessing products$ from the store and already made the "bind"
  //      between it and `dataSource`, you don't need `ngOnInit()`
  ngOnInit() {
    this.dataSource = this.products;
  }

  // TODO:
  //   1. yep, not needed too! `orderMap` logic moved to store,
  //      and `dataSource` is already bound
  ngOnChanges() {
    this.ordersMap.clear();
    this.dataSource = this.products;
  }

  // TODO:
  //    1. all that's needed here is to call the store's `addOrder(...)`
  addOrder(quantity: string, product: Product) {
    const newOrder = createOrder(quantity, product);
    this.ordersMap.set(product.id, newOrder);
    this.emitOrders.emit([...this.ordersMap.values()]);
  }
}
