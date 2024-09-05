document.addEventListener("DOMContentLoaded", function () {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amount = document.getElementById("amount");
    const convertButton = document.getElementById("convertButton");
    const swapButton = document.getElementById("swapButton");
    const result = document.getElementById("result");
    const loadingSpinner = document.getElementById("loadingSpinner");
  
    const apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
  
    // Fetch the currency data
    async function fetchCurrencyData() {
      try {
        loadingSpinner.classList.remove("hidden"); // Show loading spinner
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rates.");
        }
        const data = await response.json();
        const currencies = Object.keys(data.rates);
  
        populateCurrencyOptions(currencies);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        result.textContent = "Error fetching exchange rates. Please try again.";
        result.classList.add("text-red-500");
      } finally {
        loadingSpinner.classList.add("hidden"); // Hide loading spinner
      }
    }
  
    // Populate the dropdowns with currency options
    function populateCurrencyOptions(currencies) {
      currencies.forEach((currency) => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = currency;
        option2.value = currency;
        option1.textContent = currency;
        option2.textContent = currency;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
      });
    }
  
    // Convert the currency
    async function convertCurrency() {
      const from = fromCurrency.value;
      const to = toCurrency.value;
      const amountValue = amount.value;
  
      if (from === "" || to === "" || amountValue === "") {
        result.textContent = "Please enter all fields.";
        result.classList.add("text-red-500");
        return;
      }
  
      try {
        loadingSpinner.classList.remove("hidden"); // Show loading spinner
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        if (!response.ok) {
          throw new Error("Failed to fetch conversion rates.");
        }
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = (amountValue * rate).toFixed(2);
        result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
        result.classList.remove("text-red-500");
      } catch (error) {
        console.error("Error converting currency:", error);
        result.textContent = "Error converting currency. Please try again.";
        result.classList.add("text-red-500");
      } finally {
        loadingSpinner.classList.add("hidden"); // Hide loading spinner
      }
    }
  
    // Swap the "From" and "To" currencies
    function swapCurrencies() {
      const temp = fromCurrency.value;
      fromCurrency.value = toCurrency.value;
      toCurrency.value = temp;
    }
  
   
  
    // Event listeners
    convertButton.addEventListener("click", convertCurrency);
    swapButton.addEventListener("click", swapCurrencies);
  
    // Initialize
    fetchCurrencyData();
  });
  