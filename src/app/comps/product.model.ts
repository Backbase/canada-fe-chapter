import { Order } from "./order.model";

export interface Product {
  id: number;
  sold: number;
  name: string;
  cost: number;
}

export const updateSoldProperty = (products: Product[], orders: Order[]) =>
  orders.forEach(order => {
    const product: any =
      products.find(product => product.id === order.id);
    product.sold += order.quantity;
  });
