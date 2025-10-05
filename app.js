// click logo to go to home page
const logo = document.querySelector(".logo");
logo.addEventListener("click", () => {
  window.location.href = "index.html";
});


// Active state
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    let activeButton = document.querySelector(".filter-btn.active");
    if (activeButton) {
      activeButton.classList.remove("active");
    }
    button.classList.add("active");
  });
});


// Fetching and displaying products

const productsContainer = document.getElementById("products-container");
let allProducts = [];

// Fetching products from API
async function fetchProducts() {
  try {
    let productUrl = "https://fakestoreapi.com/products";
    const response = await fetch(productUrl);
    const data = await response.json();
    allProducts = data;
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error Occured while fetching products:", error);
  }
}

// Displaying products
function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const shortTitle = product.title.length > 15 ? product.title.substring(0, 15) + "..." : product.title;
    const shortDesc = product.description.length > 60 ? product.description.substring(0, 60) + "..." : product.description;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${shortTitle}</h3>
      <p>${shortDesc}</p>
      <div class="price">$ ${product.price.toFixed(2)}</div>
      <div class="card-buttons">
        <button>Details</button>
        <button class="add-cart-btn">Add to Cart</button>
      </div>
    `;

    // Adding event listener for "Add to Cart"
    card.querySelector(".add-cart-btn").addEventListener("click", () => {
      addToCart(product);
    });

    productsContainer.appendChild(card);
  });
}


// filter products by category
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");
    if (category === "all") {
      displayProducts(allProducts);
    }
    else {
      const filteredProducts = allProducts.filter(product => product.category === category);
      displayProducts(filteredProducts);
    }
  });
});

fetchProducts();

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Updating cart count in navbar
function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  const uniqueCount = cart ? new Set(cart.map(item => item.id)).size : 0;
  countElement.textContent = uniqueCount;
}
updateCartCount();

// Adding products to cart
function addToCart(product) {
  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Navigating to cart page on clicking cart button
let cartbtn = document.getElementById("cart-btn");
if (cartbtn) {
  cartbtn.addEventListener("click", (e) => {
    if (cartbtn.tagName.toLowerCase() !== 'a') {
      window.location.href = "cart.html";
    }
  });
}