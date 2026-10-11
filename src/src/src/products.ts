// Part A: Interfaces and Objects

export interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags?: string[]; // Optional property
  quantity?: number;
}

export interface DiscountedProduct extends Product {
  discountPercent: number;
  discountedPrice: number;
}

export const products: Product[] = [
  { id: 1, name: "Wireless Mouse", price: 799.99, inStock: true, tags: ["electronics", "accessory"], quantity: 12 },
  { id: 2, name: "USB-C Cable", price: 299.00, inStock: true, tags: ["cable"], quantity: 25 },
  { id: 3, name: "Notebook", price: 99.00, inStock: false, tags: ["stationery"], quantity: 0 },
  { id: 4, name: "Desk Lamp", price: 1299.00, inStock: true, tags: ["home", "lighting"], quantity: 5 }
];

export function getAvailableProducts(productList: Product[]): Product[] {
  return productList.filter((product: Product) => product.inStock);
}

export function applyDiscountToProducts(
  productList: Product[],
  fixedDiscount: number = 10
): DiscountedProduct[] {
  return productList.map((product: Product): DiscountedProduct => ({
    ...product,
    discountPercent: fixedDiscount,
    discountedPrice: Number((product.price * (1 - fixedDiscount / 100)).toFixed(2))
  }));
}
