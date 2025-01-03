let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: productName, quantity: 1, price: productPrice });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showConfirmationMessage(`${productName} تمت إضافته إلى السلة.`);
    updateCart();
}

function showConfirmationMessage(message) {
    const confirmationMessage = document.getElementById('confirmationMessage');
    if (confirmationMessage) {
        confirmationMessage.innerText = message;
        confirmationMessage.classList.add('show');
        setTimeout(() => {
            confirmationMessage.classList.remove('show');
        }, 3000); // يخفي الرسالة بعد 3 ثوانٍ
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        cartItems.innerHTML = '';
        let totalAmount = 0;
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.quantity * item.price).toFixed(2)}</td>
                <td><button onclick="undoItem(${index})">تراجع</button></td>
            `;
            cartItems.appendChild(row);
            totalAmount += item.quantity * item.price;
        });
        document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showConfirmationMessage("تم إعادة تنشيط السلة لإضافة فاتورة جديدة.");
}

function undoItem(index) {
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showConfirmationMessage(`تم التراجع عن ${item.name} من السلة.`);
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateCart();
});
