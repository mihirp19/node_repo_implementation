export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered";
  createdAt?: Date;
  updatedAt?: Date;
}
