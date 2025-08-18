export interface SizeType {
  id: string;
  name: string;
  price: number;
}
export interface ExtrasType {
  id: string;
  name: string;
  price: number;
}
export interface ProductType {
  basePrice: number;
  categoryId: string;
  createdAt: Date;
  description: string;
  id: string;
  image: string;
  name: string;
  order: number;
  updatedAt: Date;
  sizes: SizeType[];
  extras?: ExtrasType[];
  quantatity?: number; // Optional, used for cart items
}

export interface Option {
  name: string;
  price: number;
}