// product.model.ts
export interface Product {
  id?: string; // El id ahora debe ser obligatorio
  name: string;
  price: number;
  category: string;
  image: string;
  status: string;
}
