// Part A: Functions and Scope

export function calculateDiscount(
  price: number,
  discountPercent: number = 10
): number {
  return price - (price * discountPercent / 100);
}

export function applyBulkDiscount(
  prices: number[],
  discountRate: number
): number[] {
  return prices.map((itemPrice: number): number =>
    calculateDiscount(itemPrice, discountRate)
  );
}

// Scope demonstration
export function demonstrateScope(): void {
  for (let i = 0; i < 1; i++) {
    let message: string = "I exist only inside this loop block.";
    console.log(message);
  }

  // console.log(message);
  // If uncommented, TypeScript reports that 'message' cannot be found.
  // 'let' is block-scoped, so it is unavailable outside the loop's braces.
}

console.log("Price after default 10% discount:", calculateDiscount(100));
console.log("Prices after 20% discount:", applyBulkDiscount([100, 200, 300], 20));
demonstrateScope();

