console.log("Завдання 4");

const catalog = new Map();
const deletedProducts = new Set();
const productHistory = new WeakMap();
const activeUsers = new WeakSet();

class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
}

function addProduct(id, name, price, stock) {
    const product = new Product(id, name, price, stock);
    catalog.set(id, product);
    productHistory.set(product, [`Створено: ${new Date().toLocaleString()}`]);
    console.log(`Додано: ${name}`);
}

function deleteProduct(id) {
    const product = catalog.get(id);
    if (product) {
        catalog.delete(id);
        deletedProducts.add(id);
        console.log(`Видалено: ${product.name}`);
    }
}

function updateProduct(id, newPrice, newStock) {
    const product = catalog.get(id);
    if (product) {
        product.price = newPrice;
        product.stock = newStock;
        productHistory.get(product).push(`Оновлено: ${new Date().toLocaleString()}`);
        console.log(`Оновлено: ${product.name}`);
    }
}

function findProduct(name) {
    for (let [_, product] of catalog) {
        if (product.name.toLowerCase().includes(name.toLowerCase())) {
            console.log(product);
        }
    }
}

function makeOrder(id, quantity) {
    const product = catalog.get(id);
    if (product && product.stock >= quantity) {
        product.stock -= quantity;
        console.log(`Замовлено ${quantity}шт ${product.name}`);
    } else {
        console.log(`Недостатньо товару або не знайдено.`);
    }
}

addProduct(1, "Кава", 100, 20);
addProduct(2, "Чай", 80, 50);
updateProduct(1, 110, 15);
findProduct("Кава");
makeOrder(1, 3);
deleteProduct(2);
