# Product Inventory Manager — TypeScript Assignment

This project follows the assignment topics: basic types and variables, functions and scope, interfaces and objects, compilation/debugging, and a browser-based Product Inventory Manager.

## 1. Requirements

Install Node.js (which includes npm), then open this folder in Visual Studio Code.

## 2. Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in the terminal.

## 3. Compile TypeScript

```bash
npm run build
```

A successful build creates the `dist` folder. Save a screenshot of your own terminal output for the assignment. Do not claim a screenshot was captured unless you capture it yourself.

## 4. Files

- `src/inventory.ts`: basic typed variables, union type, and `printProductInfo()`.
- `src/functions.ts`: `calculateDiscount()`, `applyBulkDiscount()`, and block-scope example.
- `src/products.ts`: `Product` and `DiscountedProduct` interfaces, four sample products, filtering, and discounting.
- `src/main.ts`: browser UI and event handlers.
- `src/style.css`: responsive styling.
- `tsconfig.json`: compiler configuration.
- `debugging/type-errors.ts`: intentionally incorrect examples; it is kept outside `src` so it does not break the regular build.

## 5. Part A explanations

### Basic types and variables
`string` stores text, `number` stores numeric values, `boolean` stores true/false, and `string[]` stores an array of strings. `number | string` is a union type, so `productId` can be either a number or a string. `any` disables much of TypeScript's checking; a more specific type such as `string | number` catches unsupported values during compilation.

### Functions
`calculateDiscount()` returns the original price minus the discount amount. Its default `discountPercent = 10` means the function uses a 10% discount when the second argument is omitted. `applyBulkDiscount()` uses `map()` to produce a new array rather than changing the original array.

### Scope
A variable declared with `let` inside a loop's braces is block-scoped and cannot be read after the loop. If the commented `console.log(message)` in `demonstrateScope()` is uncommented, TypeScript reports that `message` is not defined in that scope.

### Interfaces and objects
An interface describes the shape an object must have. The `tags` property is optional because it uses `?`. `getAvailableProducts()` uses `filter()` to keep only products whose `inStock` value is true. `DiscountedProduct` extends `Product` and adds `discountPercent` and the calculated `discountedPrice`.

### tsconfig.json settings
- `target: ES2020` sets the JavaScript language version TypeScript emits.
- `strict: true` enables stricter type checking to catch more mistakes.
- `outDir: dist` puts compiled output in the `dist` directory.
- `rootDir: src` tells the compiler where the source files are located.

## 6. Debugging examples for the report

Create a separate copy of your code for these errors, or run each example individually.

**Error 1**
```ts
let studentAge: number = "twenty";
```
Likely compiler message: `Type 'string' is not assignable to type 'number'.`
Meaning: `studentAge` is declared as a number but receives text. Fix it by using `let studentAge: number = 20;` or change the declared type to `string` if text is intended.

**Error 2**
```ts
function calculateDiscount(price: number, discountPercent: number = 10): number {
  return price - price * discountPercent / 100;
}
calculateDiscount();
```
Likely compiler message: `Expected 1-2 arguments, but got 0.`
Meaning: the function requires the `price` argument. Fix it by calling `calculateDiscount(100)` or `calculateDiscount(100, 15)`.

Compiler message wording may vary slightly with TypeScript version. Capture the actual output from your machine.

## 7. Publish with GitHub Pages

This project uses Vite, so GitHub Pages needs a build workflow. The included `.github/workflows/deploy.yml` builds the project and publishes `dist`. Push the project to a GitHub repository, then open Settings → Pages and choose GitHub Actions if prompted. Wait for the workflow to complete; the Pages URL will be shown in the repository's Pages settings.

## 8. Limitations
The starter app keeps changes in browser memory only. Added or deleted products reset when the page is refreshed. For persistent storage, a later version could use localStorage or a database.
