import "./style.css";
import { calculateDiscount } from "./functions";
import { applyDiscountToProducts, getAvailableProducts, products, type Product } from "./products";
import { printProductInfo } from "./inventory";

// Print Part A examples in the browser developer console.
printProductInfo();
console.log("Available products:", getAvailableProducts(products));
console.log("Discounted products:", applyDiscountToProducts(products));

let nextId = Math.max(...products.map((product) => product.id), 0) + 1;
let currentFilter: "all" | "available" | "out" = "all";
let searchTerm = "";

const form = document.querySelector<HTMLFormElement>("#product-form")!;
const nameInput = document.querySelector<HTMLInputElement>("#product-name")!;
const priceInput = document.querySelector<HTMLInputElement>("#product-price")!;
const quantityInput = document.querySelector<HTMLInputElement>("#product-quantity")!;
const tagsInput = document.querySelector<HTMLInputElement>("#product-tags")!;
const discountInput = document.querySelector<HTMLSelectElement>("#product-discount")!;
const productList = document.querySelector<HTMLDivElement>("#product-list")!;
const emptyMessage = document.querySelector<HTMLParagraphElement>("#empty-message")!;
const formMessage = document.querySelector<HTMLParagraphElement>("#form-message")!;
const searchInput = document.querySelector<HTMLInputElement>("#search-input")!;

function money(value: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);
}

function renderStats(): void {
  const inStockProducts = products.filter((product) => product.inStock);
  const outOfStockProducts = products.filter((product) => !product.inStock);
  const totalValue = products.reduce(
    (total, product) => total + product.price * (product.quantity ?? (product.inStock ? 1 : 0)),
    0
  );

  document.querySelector("#total-count")!.textContent = String(products.length);
  document.querySelector("#stat-products")!.textContent = String(products.length);
  document.querySelector("#stat-stock")!.textContent = String(inStockProducts.length);
  document.querySelector("#stat-out")!.textContent = String(outOfStockProducts.length);
  document.querySelector("#stat-value")!.textContent = money(totalValue);
}

function renderProducts(): void {
  const matchingProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      (product.tags ?? []).some((tag) => tag.toLowerCase().includes(searchTerm));
    const matchesFilter =
      currentFilter === "all" ||
      (currentFilter === "available" && product.inStock) ||
      (currentFilter === "out" && !product.inStock);
    return matchesSearch && matchesFilter;
  });

  productList.replaceChildren();

  matchingProducts.forEach((product) => {
    const quantity = product.quantity ?? (product.inStock ? 1 : 0);
    const discount = Number(discountInput.value);
    const discountedPrice = calculateDiscount(product.price, discount);
    const article = document.createElement("article");
    article.className = "product-card";

    const info = document.createElement("div");
    info.className = "product-info";
    const title = document.createElement("h3");
    title.textContent = product.name;
    const meta = document.createElement("p");
    meta.className = "product-meta";
    meta.textContent = `ID: ${product.id} · Qty: ${quantity}`;
    const tagLine = document.createElement("p");
    tagLine.className = "tag-line";
    tagLine.textContent = (product.tags && product.tags.length > 0) ? product.tags.join(" · ") : "No tags";
    info.append(title, meta, tagLine);

    const details = document.createElement("div");
    details.className = "product-details";
    const priceLine = document.createElement("strong");
    priceLine.textContent = money(product.price);
    const discountedLine = document.createElement("small");
    discountedLine.textContent = discount > 0 ? `${discount}% off: ${money(discountedPrice)}` : "No discount";
    const status = document.createElement("span");
    status.className = `status ${product.inStock ? "status-in" : "status-out"}`;
    status.textContent = product.inStock ? "In stock" : "Out of stock";
    details.append(priceLine, discountedLine, status);

    const removeButton = document.createElement("button");
    removeButton.className = "delete-button";
    removeButton.type = "button";
    removeButton.textContent = "Delete";
    removeButton.setAttribute("aria-label", `Delete ${product.name}`);
    removeButton.addEventListener("click", () => {
      const index = products.findIndex((item) => item.id === product.id);
      if (index >= 0) products.splice(index, 1);
      render();
    });

    article.append(info, details, removeButton);
    productList.append(article);
  });

  emptyMessage.hidden = matchingProducts.length !== 0;
  renderStats();
}

function render(): void {
  renderProducts();
}

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const productPrice = Number(priceInput.value);
  const quantity = Number(quantityInput.value);
  const productTags = tagsInput.value.split(",").map((tag) => tag.trim()).filter(Boolean);

  if (!name || !Number.isFinite(productPrice) || productPrice <= 0 ||
      !Number.isInteger(quantity) || quantity < 0) {
    formMessage.textContent = "Enter a product name, a price above 0, and a whole-number quantity of 0 or more.";
    formMessage.className = "form-message error";
    return;
  }

  const newProduct: Product = {
    id: nextId++,
    name,
    price: productPrice,
    inStock: quantity > 0,
    tags: productTags,
    quantity
  };
  products.unshift(newProduct);
  formMessage.textContent = `${name} was added successfully.`;
  formMessage.className = "form-message success";
  form.reset();
  quantityInput.value = "1";
  discountInput.value = "10";
  render();
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  renderProducts();
});

document.querySelectorAll<HTMLButtonElement>(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter as "all" | "available" | "out";
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts();
  });
});

discountInput.addEventListener("change", renderProducts);
render();
