// دریافت اطلاعات سبد از localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// پیدا کردن div که باید محتوا داخلش قرار بگیره
const container = document.getElementById('cart-items');

// اگر سبد خالی بود
if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
}

// اگر سبد خالی نبود → نمایش محصولات
cart.forEach((product, index) => {
    const item = document.createElement('div');
    item.classList.add('cart-item');

    item.innerHTML = `
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    container.appendChild(item);
});
// محاسبه مجموع قیمت‌ها
let total = 0;
cart.forEach(product => {
    total += product.price;
});

// نمایش مجموع در صفحه
const totalBox = document.getElementById('total-price');
totalBox.textContent = "Total Price: $" + total.toFixed(2);

// فعال کردن دکمه‌های حذف
document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {

        // گرفتن شماره محصول
        const index = this.getAttribute('data-index');

        // حذف محصول از آرایه
        cart.splice(index, 1);

        // ذخیره سبد جدید در localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // رفرش صفحه برای به‌روزرسانی ظاهر
        location.reload();
    });
});
