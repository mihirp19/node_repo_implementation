export interface Order {
  id?: string;
  userId: string;
  status: "pending" | "shipped" | "delivered";
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
