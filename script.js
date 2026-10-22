/* POP & SIP PRODUCT COLLECTION */

const drinks = [
  {
    id: 1,
    name: "Fanta Orange",
    price: 4000,
    category: "citrus",
    image: "images/fanta.png",
    color: "#FFE0B2",
  },
  {
    id: 2,
    name: "Sprite Original",
    price: 4000,
    category: "classic",
    image: "images/sprite.png",
    color: "#D9F8B8",
  },
  {
    id: 3,
    name: "Coca-Cola Original",
    price: 4000,
    category: "classic",
    image: "images/coca-cola.png",
    color: "#FFD1D1",
  },
  {
    id: 4,
    name: "Fanta Citrus",
    price: 4500,
    category: "citrus",
    image: "images/fanta.png",
    color: "#FFF3A6",
  },
  {
    id: 5,
    name: "Fanta Fruity Mix",
    price: 4500,
    category: "berry",
    image: "images/fanta.png",
    color: "#FFD0E5",
  },
  {
    id: 6,
    name: "Sprite Fresh",
    price: 4500,
    category: "tropical",
    image: "images/sprite.png",
    color: "#C8F5E4",
  },
  {
    id: 7,
    name: "Fanta Strawberry",
    price: 4500,
    category: "berry",
    image: "images/fanta-strawberry.png",
    color: "#FFB3C6",
  },
  {
    id: 8,
    name: "Fanta Pineapple",
    price: 4500,
    category: "tropical",
    image: "images/fanta-pineapple.png",
    color: "#FFF0A3",
  },
  {
    id: 9,
    name: "Coca-Cola Cherry",
    price: 4000,
    category: "berry",
    image: "images/coca-cola-cherry.png",
    color: "#FFC4CC",
  },
  {
    id: 10,
    name: "Sprite Blueberry",
    price: 4200,
    category: "berry",
    image: "images/sprite-blueberry.png",
    color: "#BDEFFF",
  },
  {
    id: 11,
    name: "Mountain Dew Baja Blast",
    price: 4000,
    category: "tropical",
    image: "images/mountain-dew.png",
    color: "#B8F2E6",
  },

  {
    id: 12,
    name: "Grape Splash",
    price: 3000,
    category: "grape",
    image: "images/grape.png",
    color: "#ded8de",
  },
  {
    id: 13,
    name: "Grape Berry Blast",
    price: 3500,
    category: "grape",
    image: "images/grape-berry.png",
    color: "#7e6f8e",
  },
  {
    id: 14,
    name: "Grape Fizz",
    price: 4500,
    category: "grape",
    image: "images/grape-fizz.png",
    color: "#b1d2b5",
  },
];

let selectedCategory = "all";

function displayDrinks() {
  const container = document.getElementById("drinksContainer");

  if (!container) return;

  const search = document.getElementById("searchDrink").value.toLowerCase();

  const filtered = drinks.filter((drink) => {
    const matchesSearch = drink.name.toLowerCase().includes(search);

    const matchesCategory =
      selectedCategory === "all" || drink.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  container.innerHTML = filtered
    .map(
      (drink) => `
        <div class="drink-card" style="--card-color: ${drink.color}">

            <img src="${drink.image}" alt="${drink.name}">

            <h3>${drink.name}</h3>

            <p class="price">
                UGX ${drink.price.toLocaleString()}
            </p>

            <button onclick="addToCart(${drink.id})">
                Add to Cart 🛒
            </button>

        </div>
    `,
    )
    .join("");

  if (filtered.length === 0) {
    container.innerHTML = "<p>No drinks found. Try another flavour!</p>";
  }
}

function filterDrinks(category, button) {
  selectedCategory = category;

  document
    .querySelectorAll(".filter-buttons button")
    .forEach((btn) => btn.classList.remove("active"));

  button.classList.add("active");

  displayDrinks();
}

/* SHOPPING CART */

function addToCart(id) {
  const drink = drinks.find((item) => item.id === id);

  if (!drink) return;

  let cart = JSON.parse(localStorage.getItem("popSipCart")) || [];

  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...drink, quantity: 1 });
  }

  localStorage.setItem("popSipCart", JSON.stringify(cart));

  alert(drink.name + " added to your cart! 🥤");
}

/* INITIALISE PRODUCTS PAGE */

if (document.getElementById("drinksContainer")) {
  displayDrinks();

  document
    .getElementById("searchDrink")
    .addEventListener("input", displayDrinks);
}

/* ==========================
   DISPLAY SHOPPING CART
========================== */

function displayCart() {
  const container = document.getElementById("cartContainer");
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem("popSipCart")) || [];

  const totalElement = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🥺</h2>
                <p>Let's find something fizzy!</p>
                <a href="products.html">Shop Drinks →</a>
            </div>
        `;

    totalElement.textContent = "UGX 0";
    checkoutBtn.style.display = "none";
    return;
  }

  checkoutBtn.style.display = "inline-block";

  let total = 0;

  cart.forEach((drink) => {
    total += drink.price * drink.quantity;

    container.innerHTML += `
            <div class="cart-item">

                <img src="${drink.image}" alt="${drink.name}">

                <div class="cart-info">
                    <h3>${drink.name}</h3>
                    <p>UGX ${drink.price.toLocaleString()}</p>
                </div>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${drink.id}, -1)">−</button>
                    <span>${drink.quantity}</span>
                    <button onclick="changeQuantity(${drink.id}, 1)">+</button>
                </div>

                <button class="remove-btn"
                    onclick="removeFromCart(${drink.id})">
                    Remove ✕
                </button>

            </div>
        `;
  });

  totalElement.textContent = "UGX " + total.toLocaleString();
}

/* CHANGE QUANTITY */

function changeQuantity(id, amount) {
  let cart = JSON.parse(localStorage.getItem("popSipCart")) || [];

  const item = cart.find((drink) => drink.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter((drink) => drink.id !== id);
  }

  localStorage.setItem("popSipCart", JSON.stringify(cart));

  displayCart();
}

/* REMOVE PRODUCT */

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("popSipCart")) || [];

  cart = cart.filter((drink) => drink.id !== id);

  localStorage.setItem("popSipCart", JSON.stringify(cart));

  displayCart();
}

/* INITIALISE CART PAGE */

if (document.getElementById("cartContainer")) {
  displayCart();
}

/* ===== CHECKOUT PAGE ===== */

function displayCheckout() {
  const checkoutItems = document.getElementById("checkoutItems");

  const checkoutTotal = document.getElementById("checkoutTotal");

  if (!checkoutItems || !checkoutTotal) return;

  const cart = JSON.parse(localStorage.getItem("popSipCart")) || [];

  checkoutItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your cart is empty 🛒</p>";
  }

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;

    total += subtotal;

    checkoutItems.innerHTML += `
      <div class="checkout-item">
        <span>${item.name} × ${item.quantity}</span>
        <strong>UGX ${subtotal.toLocaleString()}</strong>
      </div>
    `;
  });

  checkoutTotal.textContent = "UGX " + total.toLocaleString();
}

/* ===== PLACE ORDER ===== */

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
  displayCheckout();

  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const cart = JSON.parse(localStorage.getItem("popSipCart")) || [];

    if (cart.length === 0) {
      alert("Your cart is empty! Please add some drinks first 🥤");
      return;
    }

    const customerName = document.getElementById("fullName").value.trim();

    alert(
      "Thank you, " +
        customerName +
        "! 🎉 Your POP & SIP demo order has been recorded!",
    );

    localStorage.removeItem("popSipCart");

    window.location.href = "index.html";
  });
}

/* ==========================
   CONTACT FORM
========================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();

    const email = document.getElementById("contactEmail").value.trim();

    const subject = document.getElementById("contactSubject").value;

    const message = document.getElementById("contactMessage").value.trim();

    const feedback = document.getElementById("contactFeedback");

    if (!name || !email || !subject || !message) {
      feedback.textContent = "Please complete all fields.";
      return;
    }

    feedback.textContent =
      "Thank you, " +
      name +
      "! Your demo message was submitted successfully 💗";

    contactForm.reset();
  });
}
