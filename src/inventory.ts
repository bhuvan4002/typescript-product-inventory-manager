// Part A: Basic Types and Variables

export let productName: string = "Wireless Mouse";
export let price: number = 799.99;
export let inStock: boolean = true;
export let tags: string[] = ["electronics", "accessory"];
export let productId: number | string = "WM-101"; // Union type: number OR string.

export function printProductInfo(): void {
  console.log(
    `Product: ${productName}, Price: ₹${price.toFixed(2)}, ` +
    `In stock: ${inStock}, Tags: ${tags.join(", ")}, ID: ${productId}`
  );
}

// Avoid 'any' where possible because it turns off type checking.
let flexibleValue: any = "TypeScript";
flexibleValue = 42;

// Safer refactor: a union type only permits the listed types.
let saferValue: string | number = "TypeScript";
saferValue = 42;
// saferValue = true; // TypeScript error: boolean is not allowed.

