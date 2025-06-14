export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
