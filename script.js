class BankAccount {
    constructor(accountNumber, name, balance) {
        this.accountNumber = accountNumber;
        this.name = name;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return "Amount deposited successfully.";
        } else {
            return "Invalid amount.";
        }
    }

    withdraw(amount) {
        if (amount <= 0) {
            return "Invalid amount.";
        } else if (amount > this.balance) {
            return "Insufficient balance.";
        } else {
            this.balance -= amount;
            return "Amount withdrawn successfully.";
        }
    }

    displayAccount() {
        return `
            <b>Account Number:</b> ${this.accountNumber}<br>
            <b>Account Holder:</b> ${this.name}<br>
            <b>Balance:</b> ${this.balance.toFixed(2)}/-
        `;
    }
}

let account = null;

function createAccount() {
    const accountNumber = document.getElementById("accountNumber").value.trim();
    const name = document.getElementById("name").value.trim();
    const balance = Number(document.getElementById("initialBalance").value);

    if (accountNumber === "" || name === "" || balance < 0 || isNaN(balance)) {
        showMessage("Please enter valid account details.");
        return;
    }

    account = new BankAccount(accountNumber, name, balance);

    document.getElementById("bankOperations").style.display = "block";
    document.getElementById("accountForm").style.display = "none";

    showMessage("Account created successfully.");
    displayAccount();
}

function depositMoney() {
    if (!account) return;

    const amount = Number(document.getElementById("amount").value);

    if (isNaN(amount) || amount <= 0) {
        showMessage("Enter a valid deposit amount.");
        return;
    }

    showMessage(account.deposit(amount));
    displayAccount();
    clearAmount();
}

function withdrawMoney() {
    if (!account) return;

    const amount = Number(document.getElementById("amount").value);

    if (isNaN(amount) || amount <= 0) {
        showMessage("Enter a valid withdrawal amount.");
        return;
    }

    showMessage(account.withdraw(amount));
    displayAccount();
    clearAmount();
}

function displayAccount() {
    document.getElementById("accountDetails").innerHTML =
        account.displayAccount();
}

function checkBalance() {
    if (!account) return;

    showMessage("Current Balance:" + account.balance.toFixed(2)+"/-");
}

function clearAmount() {
    document.getElementById("amount").value = "";
}

function showMessage(message) {
    document.getElementById("message").innerText = message;
}
