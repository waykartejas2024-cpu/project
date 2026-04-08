<script>
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if(item){
        item.qty += 1;
    } else {
        cart.push({name, price, qty:1});
    }

    saveCart();
    updateCart();
}

function updateCart() {
    let list = document.getElementById("cart-items");
    let totalEl = document.getElementById("total");

    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price} x ${item.qty}
            <button onclick="changeQty(${index},1)">+</button>
            <button onclick="changeQty(${index},-1)">-</button>
            <button onclick="removeItem(${index})">❌</button>
        `;
        list.appendChild(li);
    });

    totalEl.innerText = total;
}

function changeQty(index, change) {
    cart[index].qty += change;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    saveCart();
    updateCart();
}

function removeItem(index) {
    cart.splice(index,1);
    saveCart();
    updateCart();
}

function showForm() {
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }
    document.getElementById("order-form").style.display = "block";
}

function placeOrder(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let mobile = document.getElementById("mobile").value;

    let total = 0;
    let message = "🛒 Order Details:\n\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.qty} = ₹${item.price * item.qty}\n`;
        total += item.price * item.qty;
    });

    message += `\nTotal: ₹${total}`;
    message += `\n\nName: ${name}`;
    message += `\nAddress: ${address}`;
    message += `\nMobile: ${mobile}`;

    
    let phone = "919405048512";

    let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    cart = [];
    saveCart();
    updateCart();

    document.getElementById("order-form").style.display = "none";
}

// load cart on page load
updateCart();
</script>
