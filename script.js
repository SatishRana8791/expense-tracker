// Select DOM elements
const addButton = document.getElementById('add-button');
const expenseNameInput = document.getElementById('Expense-Name');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmountDisplay = document.getElementById('total-amount');

// Initialize total amount
let totalAmount = 0;

// Load expenses from localStorage
function loadExpenses() {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    totalAmount=0;
    storedExpenses.forEach(expense => {
        addExpenseToDOM(expense.name, expense.amount);
        totalAmount+=expense.amount;
    });
    updateTotalAmount();
}

// Add expense to DOM
function addExpenseToDOM(name, amount) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${name} <span>₹${amount.toFixed(2)}</span>`;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.onclick = () => {
        removeExpense(listItem, name, amount);
    };

    listItem.appendChild(deleteButton);
    expenseList.appendChild(listItem);
}

// Update total amount
function updateTotalAmount() {
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
}

// Save expenses to localStorage
function saveExpenses() {
    const expenses = [];
    document.querySelectorAll('#expense-list li').forEach(item => {
        const name = item.firstChild.textContent.trim();
        const amount = parseFloat(item.querySelector('span').textContent.replace('₹', '').trim());
        expenses.push({ name, amount });
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Remove expense from DOM and localStorage
function removeExpense(listItem, name, amount) {
    listItem.remove();
    totalAmount -= amount;
    updateTotalAmount();
    saveExpenses();
}

// Add event listener to the add button
addButton.addEventListener('click', () => {
    const expenseName = expenseNameInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (!expenseName || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense name and amount.');
        return;
    }

    addExpenseToDOM(expenseName, amount);
    totalAmount += amount;
    updateTotalAmount();
    saveExpenses();

    expenseNameInput.value = '';
    amountInput.value = '';
});

// Load expenses when the page loads
window.addEventListener('load', loadExpenses);
