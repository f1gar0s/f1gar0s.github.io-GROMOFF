// scripts.js
document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Отображение корзины
    function renderCart() {
        const cartItemsContainer = document.querySelector(".cart-items");
        const totalPriceElement = document.getElementById("total-price");

        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = "";

        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <h3>Ваша корзина пуста</h3>
                    <p>Добавьте товары из каталога</p>
                    <a href="catalog.html" class="see_all" style="display: inline-block; margin-top: 20px;">Перейти в каталог</a>
                </div>
            `;
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";

                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="price">${item.price} ₽</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Удалить</button>
                `;

                cartItemsContainer.appendChild(itemDiv);
                totalPrice += item.price;
            });
        }

        if (totalPriceElement) {
            totalPriceElement.textContent = totalPrice + " ₽";
        }
    }

    // Добавление товара в корзину
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const name = this.previousElementSibling.previousElementSibling.textContent;
            const price = parseInt(this.previousElementSibling.textContent);
            const image = this.parentElement.querySelector('img').src;

            const newItem = { id, name, price, image };
            cart.push(newItem);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Товар добавлен в корзину!");
            renderCart();
        });
    });

    // Удаление товара из корзины
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    };

    // Оформление заказа
    document.querySelector('.checkout-btn')?.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        alert('Заказ оформлен! Спасибо за покупку!');
        localStorage.removeItem("cart");
        renderCart();
    });

    // Инициализация
    renderCart();
});