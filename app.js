const products = [
  { name: "Talus 6", description: "A firm sole with a wide heel for loose, rocky climbs.", price: 119, upper: "#d4ae63", trim: "#9ebd8e", sizes: [38, 39, 40, 41, 42, 43, 44, 45] },
  { name: "Fern Loop", description: "A flexible forefoot and broad treads for damp leaves.", price: 95, upper: "#a6c886", trim: "#d8b996", sizes: [37, 38, 39, 40, 41, 42, 44] },
  { name: "Ford Silt", description: "A low collar with quick-draining side panels for shallow crossings.", price: 84, upper: "#85b8c2", trim: "#c9ad85", sizes: [38, 39, 40, 42, 43, 44, 45] },
];
const money = new Intl.NumberFormat("en", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const terrainButtons = document.querySelectorAll("[data-product]");
const sizeSelect = document.querySelector("#size");
const items = document.querySelector("#items");
const status = document.querySelector("#status");
const pack = new Map();
let selected = 0;

function showProduct(index) {
  const previousSize = Number(sizeSelect.value);
  const product = products[index];
  selected = index;
  document.querySelector("#product-name").textContent = product.name;
  document.querySelector("#product-description").textContent = product.description;
  document.querySelector("#price").textContent = money.format(product.price);
  document.querySelector("#art").style.setProperty("--upper", product.upper);
  document.querySelector("#art").style.setProperty("--trim", product.trim);
  document.querySelector("#art-title").textContent = `Illustration of the ${product.name} trail shoe`;
  sizeSelect.replaceChildren(...product.sizes.map(size => new Option(size, size)));
  sizeSelect.value = product.sizes.includes(previousSize) ? previousSize : product.sizes[0];
  terrainButtons.forEach(button => button.setAttribute("aria-pressed", Number(button.dataset.product) === index));
}

function showPack() {
  let count = 0;
  let subtotal = 0;
  const lines = [];
  for (const [key, { product, size, quantity }] of pack) {
    count += quantity;
    subtotal += product.price * quantity;
    const line = document.createElement("li");
    const description = document.createElement("span");
    description.textContent = `${quantity} × ${product.name}, EU ${size}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.dataset.remove = key;
    remove.textContent = "Remove one";
    remove.setAttribute("aria-label", `Remove one ${product.name}, EU ${size}`);
    line.append(description, remove);
    lines.push(line);
  }
  items.replaceChildren(...lines);
  document.querySelector("#count").textContent = count;
  document.querySelector("#empty").hidden = count > 0;
  document.querySelector("#total").textContent = count ? `Subtotal ${money.format(subtotal)}` : "";
}

terrainButtons.forEach(button => button.addEventListener("click", () => showProduct(Number(button.dataset.product))));
document.querySelector("#order").addEventListener("submit", event => {
  event.preventDefault();
  const size = Number(sizeSelect.value);
  const product = products[selected];
  if (!product.sizes.includes(size)) return;
  const key = `${selected}:${size}`;
  pack.set(key, { product, size, quantity: (pack.get(key)?.quantity ?? 0) + 1 });
  showPack();
  status.textContent = `Added ${product.name}, EU ${size}. ${pack.get(key).quantity} of this item in your pack.`;
});

items.addEventListener("click", event => {
  const key = event.target.dataset.remove;
  const entry = pack.get(key);
  if (!entry) return;
  entry.quantity -= 1;
  if (!entry.quantity) pack.delete(key);
  showPack();
  status.textContent = `Removed one ${entry.product.name}, EU ${entry.size}.`;
  const next = [...items.querySelectorAll("button")].find(button => button.dataset.remove === key);
  (next ?? items.querySelector("button") ?? document.querySelector("#order button")).focus();
});

showProduct(0);
showPack();
