let products = [];
let currentSort = null;
let currentCategory = 'all';

const productList = document.getElementById('product-list');
const totalPriceEl = document.getElementById('total-price');
const emptyMessage = document.getElementById('empty-message');
const productForm = document.getElementById('productForm');
const modal = document.getElementById('productModal');
const snackbar = document.getElementById('snackbar');
const addProductBtn = document.getElementById('addProductBtn');

addProductBtn.addEventListener('click', () => openModal());
productForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('productId').value || Date.now().toString();
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value.trim();
    const image = document.getElementById('productImage').value.trim();

    const existingIndex = products.findIndex(p => p.id === id);
    const timestamp = new Date().toISOString();

    const product = {
        id,
        name,
        price,
        category,
        image,
        createdAt: existingIndex === -1 ? timestamp : products[existingIndex].createdAt,
        updatedAt: timestamp
    };

    if (existingIndex === -1) {
        products.push(product);
        showSnackbar(`Товар "${name}" додано.`);
    } else {
        products[existingIndex] = product;
        showSnackbar(`Товар ID ${id} оновлено: ${name}`);
    }

    closeModal();
    renderProducts();
}

function renderProducts() {
    productList.innerHTML = '';
    const filtered = products.filter(p => currentCategory === 'all' || p.category === currentCategory);
    const sorted = sortArray(filtered, currentSort);

    if (sorted.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }

    sorted.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <p>ID: ${p.id}</p>
            <h3>${p.name}</h3>
            <p>Ціна: ${p.price.toFixed(2)} грн</p>
            <p>Категорія: ${p.category}</p>
            <img src="${p.image}" alt="${p.name}" />
            <button onclick="editProduct('${p.id}')">Редагувати</button>
            <button onclick="deleteProduct('${p.id}')">Видалити</button>
        `;
        productList.appendChild(card);
    });

    updateTotalPrice(sorted);
}

function updateTotalPrice(arr) {
    const total = arr.reduce((sum, p) => sum + p.price, 0);
    totalPriceEl.textContent = total.toFixed(2);
}

function deleteProduct(id) {
    const product = products.find(p => p.id === id);
    products = products.filter(p => p.id !== id);
    renderProducts();
    showSnackbar(`Товар "${product.name}" видалено.`);
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productImage').value = product.image;
    openModal(true);
}

function openModal(edit = false) {
    modal.style.display = 'block';
    document.getElementById('modalTitle').textContent = edit ? 'Редагувати товар' : 'Новий товар';
    if (!edit) productForm.reset();
}

function closeModal() {
    modal.style.display = 'none';
    productForm.reset();
    document.getElementById('productId').value = '';
}

function showSnackbar(message) {
    snackbar.textContent = message;
    snackbar.className = 'snackbar show';
    setTimeout(() => snackbar.className = 'snackbar', 3000);
}

function filterCategory(cat) {
    currentCategory = cat;
    renderProducts();
}

function resetFilters() {
    currentCategory = 'all';
    renderProducts();
}

function sortProducts(type) {
    currentSort = type;
    renderProducts();
}

function resetSort() {
    currentSort = null;
    renderProducts();
}

function sortArray(arr, key) {
    if (!key) return arr;
    return [...arr].sort((a, b) => {
        if (key === 'price') return a.price - b.price;
        return new Date(a[key]) - new Date(b[key]);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    document.getElementById('filter-all').addEventListener('click', () => filterCategory('all'));
    document.getElementById('filter-electronics').addEventListener('click', () => filterCategory('Електроніка'));
    document.getElementById('filter-clothing').addEventListener('click', () => filterCategory('Одяг'));
    document.getElementById('filter-food').addEventListener('click', () => filterCategory('Продукти'));
    document.getElementById('reset-filter').addEventListener('click', resetFilters);

    document.getElementById('sort-price').addEventListener('click', () => sortProducts('price'));
    document.getElementById('sort-date-created').addEventListener('click', () => sortProducts('createdAt'));
    document.getElementById('sort-date-updated').addEventListener('click', () => sortProducts('updatedAt'));
    document.getElementById('reset-sort').addEventListener('click', resetSort);
});
