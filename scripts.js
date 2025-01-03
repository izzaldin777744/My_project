const products = [
    { name: "الواح طاقة شمسية",price : "باسعار معقولة",  description: "لوح شمسي عالي الكفاءة." },
    { name: "بطاطير الطاقة الشمسية ", price: "بطاطير جيل و ليثيوم وكربون ", description: "بجودة عالية وبضمان 5 سنوات" },
    { name: "محولات الطاقة الشمسية ", price: "بتقنيات الهايبرد", description: "بجميع الاحجام والموصفات العالية " },
    {name: "يوجد جميع انواع كيبولات الطاقة الشمسية", price : "DC" , description : "10 ملي , 6 ملي , 4 ملي"},
    {name : "كشافات الطاقة الشمسية", price : "بكفاةء عالية", description : "100 واط , 1000 واط , 50 واط"}
];

const productList = document.getElementById('product-list');

products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'product-item';
    productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <p>${product.description}</p>
    `;
    productList.appendChild(productItem);
});
function searchProduct() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const productList = document.getElementById('product-list');
    const products = productList.getElementsByClassName('product-item');

    Array.from(products).forEach(product => {
        const productName = product.getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}

let cart = [];

function addToCart(product) {
    const item = cart.find(i => i.name === product);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: product, quantity: 1, price: 10 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let totalAmount = 0;
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td><td>$${(item.quantity * item.price).toFixed(2)}</td>`;
        cartItems.appendChild(row);
        totalAmount += item.quantity * item.price;
    });
    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
}

