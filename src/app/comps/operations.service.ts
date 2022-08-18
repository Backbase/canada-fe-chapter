import { Injectable } from '@angular/core';
import { Product, updateSoldProperty } from './product.model';
import { Order } from "./order.model";

// TODO-1:
//   1. [done] `npm i @ngrx/component-store`
//   2. * Think: the state of what properties do we need to maintain?
//      Then, create an interface `OperationsState` that houses them
//      When done, cross-check with Accelerator#1.2 below
//   3. * What would the default (initial) value be for each object?
//      Then, create an object `defaultState` of type `OperationsState`
//      that sets them
//   4. Although an Injectable, we don't need the store at the `root`
//      level; its' needed only in the `providers` list at the component
//      that needs it; it's children will have access to it naturally;
//      make it @Injectable()
@Injectable({
  providedIn: 'root'
})
// TODO-2:
//   1. * To convert this service into a component-store, it has to "extend"
//      `ComponentStore` with the generic type you created above;
//       that's how the store becomes aware-of and manages it's properties state
export class OperationsService {

  products: Product[] = [
    {id: 10, sold: 0, name: 'Beach ball', cost: 14},
    {id: 20, sold: 0, name: 'Towel', cost: 5},
    {id: 30, sold: 0, name: 'Frisbee', cost: 2},
    {id: 40, sold: 0, name: 'Sunscreen', cost: 4},
    {id: 50, sold: 0, name: 'Cooler', cost: 25},
    {id: 60, sold: 0, name: 'Swim suit', cost: 15}
  ];

  // TODO-3:
  //   1. Extending a parent? then `super(...)` initialize it
  //      with your default object

  // TODO-5:
  //   1. Let's `loadProducts()` in the constructor so that `products` is
  //      loaded and ready in the components that need it
  constructor() {
  }

  // TODO-4:
  //   1. * Our most important property is `products`. Only after its set
  //      can we view the Boutique and make `orders`, calculate `paymentDue`
  //      and keep our total `earnings` in check after every payment.
  //      So, let's create a `setState` method that immutably returns the state,
  //      but overrides the default setting with our list of fresh `products`

  // TODO-6:
  //   1. * `products` is state-managed, so if we create a selector for it,
  //      it's instantly available for any subscriber (here or in components).
  //      Create the selector for it. Should be the same name + $.

  updateSales(orders: Order[]) {
    updateSoldProperty(this.products, orders);
  }

  // TODO: create a `makePayment()` method that does this:
  //   1. use rxjs's zip() on `earnings$` and `this.paymentDue$`
  //   2. patchState of `earnings` by adding zip's observables
  //   we can now:
  //   3. patchState of `paymentDue` to zero now
  //   4. patchState of `orders` to []
  //   5. call the `updateSales()` method

  // TODO: create an `updateSales() method that does this:
  //   1. subscribe to `products$` to fetch `products`
  //   2. use `updateSoldProperty()` to update data
  //      parameters? (products, [...this.ordersMap.values()])
  //   3. we're done with `orderMap`, clear it
  //   4. update `productsUpdate` method update the state of `products`
  //   5. inform subscribers of `emitPaymentProcessed` that we're done
}


// ====================== Accelerators ===================================

// 1.2 `OperationsState` should manage
//     `products: Product[]`, `orders: Order[]`,
//     `earnings: number` and `paymentDue:number`

// 1.3 const defaultState: OperationsState = { products: [], orders: [],
//     earnings: 0, paymentDue: 0}

// 2.1 export class OperationsService extends ComponentStore<OperationsState> {

// 4.1   readonly loadProducts = () => this.setState((state) => ({
//         ...state,
//         products: this.products
//       }));

// 6.1   readonly products$ = this.select(({products}) => products);    or equally:
//       readonly products$ = this.select(state => state.products);

