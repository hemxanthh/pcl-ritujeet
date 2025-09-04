export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  isVintage: boolean;
  selectedSize?: string;
}