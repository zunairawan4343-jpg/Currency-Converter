const API_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const output = document.getElementById("output");

async function loadCurrencies() {
    try {
        const response = await fetch(`${API_URL}.json`);
        const data = await response.json();
        const currencies = Object.keys(data);
        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.text = currency.toUpperCase();
            const option2 = option1.cloneNode(true);
            fromSelect.appendChild(option1);
            toSelect.appendChild(option2);
        });
        fromSelect.value = "usd";
        toSelect.value = "pkr";
    } catch (error) {
        console.error("Error loading currencies", error);
    }
}
loadCurrencies();

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = fromSelect.value;
    const to = toSelect.value;
    if (amount === "") {
        output.innerText = "Please enter amount";
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${from}.json`);
        const data = await response.json();
        const rate = data[from][to];
        const convertedAmount = (amount * rate).toFixed(2);
        output.innerText = `${amount} ${from.toUpperCase()} = ${convertedAmount} ${to.toUpperCase()}`;
    } catch (error) {
        output.innerText = "Error fetching data!";
        console.error(error);
    }
}
