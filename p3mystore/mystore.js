let products = [];

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showProducts(products); 
  });

const cart = {};

const addToCart = (id) => {
  if (!cart[id]) cart[id] = 1;
  showCart();
};

const increment = (id) => {
  cart[id]++;
  showCart();
};

const decrement = (id) => {
  if (cart[id] > 1) {
    cart[id]--;
  } else {
    deleteCart(id);
  }
  showCart();
};

const displayCart = () => {
  cartBox.style.display = "block";
  productBox.style.display = "none";
};

const hideCart = () => {
  cartBox.style.display = "none";
  productBox.style.display = "block";
};

const deleteCart = (id) => {
  delete cart[id];
  showCart();
};

function searchFunction() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
  );
  showProducts(filtered);
}

const showTotal = () => {
  let total = products.reduce((sum, value) => {
    return sum + value.price * (cart[value.id] ?? 0);
  }, 0);
  order.innerHTML = total.toFixed(2);
};

const showCart = () => {
  let count = Object.keys(cart).length;
  items.innerHTML = count;
  showTotal();
  let str = "";
  products.forEach((value) => {
    if (cart[value.id]) {
      str += `<div>
        ${value.name} - $${value.price} 
        <button onclick='decrement(${value.id})'>-</button>
        ${cart[value.id]}
        <button onclick='increment(${value.id})'>+</button>
        = $${(value.price * cart[value.id]).toFixed(2)}
        <button onclick='deleteCart(${value.id})'>Delete</button>
      </div>`;
    }
  });
  divCart.innerHTML = str;
};

const showProducts = (productList) => {
  let str = "<div class='row'>";
  productList.forEach((value) => {
    str += `
      <div class='box'>
        <img src='${value.url}' />
        <h3>${value.name}</h3>
        <p>${value.desc}</p>
        <h4>$${value.price}</h4>
        <button onclick='addToCart(${value.id})' class="btnAdd">Add to Cart</button>
      </div>
    `;
  });
  divProducts.innerHTML = str + "</div>";
};
