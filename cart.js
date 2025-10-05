let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Updating navbar cart count (distinct products)
function updateCartCount() {
    const countElement = document.getElementById("cart-count");
    const uniqueCount = cart ? new Set(cart.map(item => item.id)).size : 0;
    countElement.textContent = uniqueCount;
}
updateCartCount();

// Rendering cart
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const orderSummary = document.getElementById("order-summary");

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartItems.style.color = "red";
        cartItems.style.fontSize = "20px";
        cartItems.style.fontWeight = "bold";
        cartItems.style.textAlign = "center";
        orderSummary.innerHTML = "";
        updateCartCount();
        return;
    }

    cartItems.innerHTML = cart.map(item => `
    <div class="cart-items">
        <div class="cart-item">
            <div class="cart-parent">
                <div>
                    <img src="${item.image}" alt="${item.title}">
                </div>

                <div class="cart-info">
                    <h3>${item.title}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-right">
                    <div class="quantity">
                        <button onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                    <div class="subtotal">$${(item.price * item.quantity).toFixed(2)} </div>
                </div>
            </div>   
        </div>
    </div>
  `).join("");

    // Calculating total cart value
    let productTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let shipping = 30;
    let total = productTotal + shipping;

    orderSummary.innerHTML = `
    <h3>Order Summary</h3>
    <p>Products (${cart.length}): $${productTotal.toFixed(2)}</p>
    <p>Shipping: $${shipping}</p>
    <h4>Total amount: $${total.toFixed(2)}</h4>
    <button class="btn" style="width:100%; margin-top:10px; "> Go to Checkout </button>
  `;

  updateCartCount();
}

// Change quantity
function changeQty(id, delta) {
    let item = cart.find(p => p.id === id);
    if(!item){
         return;
    }
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== id);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

renderCart();

// logo to home
const logo = document.querySelector(".logo");
if (logo) {
    logo.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}