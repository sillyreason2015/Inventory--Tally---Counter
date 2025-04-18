// === TALLY COUNTER FUNCTIONALITY ===
let saveEl = document.getElementById("save-el");
let countEl = document.getElementById("count-el");
let count = 0;

function increment() {
    count += 1;
    countEl.textContent = count;
}

function subtract() {
    count -= 1;
    countEl.textContent = count;
}

function save() {
    let countStr = count + " - ";
    saveEl.textContent += countStr;
    countEl.textContent = 0;
    count = 0;
}

// === INVENTORY FUNCTIONALITY ===
const form = document.getElementById("item-form");
const inventoryList = document.getElementById("inventory-list");

let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let editIndex = null;

window.onload = () => {
    renderInventory();
};

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("item-name").value;
    const quantity = parseInt(document.getElementById("item-quantity").value);
    const price = parseFloat(document.getElementById("item-price").value).toFixed(2);
    const category = document.getElementById("item-category").value;

    const item = { name, quantity, price, category };

    if (editIndex === null) {
        // Add new item
        inventory.push(item);
    } else {
        // Update existing item
        inventory[editIndex] = item;
        editIndex = null;
        form.querySelector("button[type='submit']").textContent = "Add Item";
    }

    localStorage.setItem("inventory", JSON.stringify(inventory));
    renderInventory();
    form.reset();
});

function renderInventory() {
    inventoryList.innerHTML = "";

    inventory.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.name}</strong> (${item.category}) - 
            Qty: ${item.quantity}, Price: $${item.price} 
            <button onclick="editItem(${index})">Edit</button>
            <button onclick="removeItem(${index})">Delete</button>
        `;
        inventoryList.appendChild(li);
    });
}

function editItem(index) {
    const item = inventory[index];
    document.getElementById("item-name").value = item.name;
    document.getElementById("item-quantity").value = item.quantity;
    document.getElementById("item-price").value = item.price;
    document.getElementById("item-category").value = item.category;

    editIndex = index;
    form.querySelector("button[type='submit']").textContent = "Update Item";
}

function removeItem(index) {
    inventory.splice(index, 1);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    renderInventory();
}
