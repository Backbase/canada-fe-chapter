import { Product } from "./product.model";

export interface Order {
  id: number;
  cost: number;
  name: string;
  quantity: number;
}

export const createOrder = (quantity: string, product: Product) => {
  return {
    id: product.id,
    quantity: +quantity,
    cost: product.cost,
    name: product.name
  } as Order;
};

export const getPaymentDue = (orders: Order[]) =>
  orders?.reduce((acc, order) =>
    acc + order.cost * order.quantity, 0);

export const getOrdersWithQuantity = (orders: Order[]) =>
  orders?.filter(order => order.quantity > 0);
