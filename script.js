const products = [
    {
        id: 1,
        name: "Kai 1 White",
        category: "Kai 1",
        categoryName: "รองเท้าบาสไค 1",
        price: 2499,
        image: "produck/kai 1 white.jpg"
    },
    {
        id: 2,
        name: "Kai 1 Sun",
        category: "Kai 1",
        categoryName: "รองเท้าบาสไค 1",
        price: 2499,
        image: "produck/kai1 sun.jpg"
    },
    {
        id: 3,
        name: "Kai 1 teme black",
        category: "Kai 1",
        categoryName: "รองเท้าบาสไค 1",
        price: 1499,
        image: "produck/kai1 teme black.jpg"
    },
    {
        id: 4,
        name: "Kai 1 speed green",
        category: "Kai 1",
        categoryName: "รองเท้าบาสไค 1",
        price: 1490,
        image: "produck/kai1 speed green.jpg"
    },
    {
        id: 5,
        name: "Kai 2 pink",
        category: "Kai 2",
        categoryName: "รองเท้าบาสไค 2",
        price: 3990,
        image: "produck/kai2 pink.jpg"
    },
    {
        id: 6,
        name: "Kai 2 speed",
        category: "Kai 2",
        categoryName: "รองเท้าบาสไค 2",
        price: 3990,
        image: "produck/kai2 speed.jpg"
    },
    {
        id: 7,
        name: "Kai 3 house",
        category: "Kai 3",
        categoryName: "รองเท้าบาสไค 3",
        price: 4990,
        image: "produck/kai3 house.jpg"
    },
    {
        id: 8,
        name: "Shock wave 7 purple",
        category: "Shock wave 7",
        categoryName: "รองเท้าบาสช็อคเวฟ 7",
        price: 2590,
        image: "produck/shock wave7 pueple.jpg"
    }
];

let cart = [];

function displayProducts() {

    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    const search = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchSearch =
            product.name.toLowerCase().includes(search);

        const matchCategory =
            category === "all" ||
            product.category === category;

        return matchSearch && matchCategory;
    });

    productList.innerHTML = "";

    if (filteredProducts.length === 0) {

        productList.innerHTML = `
            <div class="no-product">
                ไม่พบสินค้าที่ค้นหา
            </div>
        `;

        return;
    }

    filteredProducts.forEach(product => {

        productList.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >
                </div>

                <div class="product-info">

                    <div class="product-category">
                        ${product.categoryName}
                    </div>

                    <h3>${product.name}</h3>

                    <div class="product-price">
                        ฿${product.price.toLocaleString()}
                    </div>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        เพิ่มลงตะกร้า
                    </button>

                </div>

            </div>
        `;
    });
}

function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    const existingProduct = cart.find(
        item => item.id === id
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    alert("เพิ่ม " + product.name + " ลงในตะกร้าแล้ว");
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {

        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;

    });

    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        "฿" + totalPrice.toLocaleString();

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                🛒
                <br>
                <br>
                ยังไม่มีสินค้าในตะกร้า
            </div>
        `;

        return;
    }

    cart.forEach(item => {

        cartItems.innerHTML += `
            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>
                        ฿${item.price.toLocaleString()}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="delete-button"
                        onclick="removeFromCart(${item.id})"
                    >
                        ลบสินค้า
                    </button>

                </div>

            </div>
        `;
    });
}

function changeQuantity(id, amount) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );

    }

    updateCart();
}

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    updateCart();
}

function openCart() {

    document
        .getElementById("cartOverlay")
        .classList.add("active");

}

function closeCart(event) {

    const overlay =
        document.getElementById("cartOverlay");

    if (
        !event ||
        event.target === overlay
    ) {

        overlay.classList.remove("active");

    }
}

function checkout() {

    if (cart.length === 0) {

        alert("กรุณาเลือกสินค้าก่อนสั่งซื้อ");

        return;
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    alert(
        "สั่งซื้อสำเร็จ 🎉\n\n" +
        "ร้าน NBasketball\n" +
        "ยอดรวม ฿" +
        total.toLocaleString()
    );

    cart = [];

    updateCart();

    closeCart();
}

displayProducts();
updateCart();