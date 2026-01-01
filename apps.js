import { currencies } from "./codes.js";

document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://latest.currency-api.pages.dev/v1/currencies";

  const fromBox = document.getElementById("from");
  const toBox = document.getElementById("to");
  const convertBtn = document.querySelector("button");
  const output = document.querySelector("p");

  setupDropdown(fromBox, "USD");
  setupDropdown(toBox, "PKR");

  convertBtn.addEventListener("click", async () => {
    const amountInput = document.querySelector("input");
    const amount = amountInput.value;

    const from = fromBox.querySelector("div").dataset.value;
    const to = toBox.querySelector("div").dataset.value;

    if (!amount || amount <= 0) {
      output.innerText = "Enter a valid amount";
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${from.toLowerCase()}.json`);
      const data = await res.json();
      const rate = data[from.toLowerCase()][to.toLowerCase()];
      output.innerText = `${amount} ${from} = ${(amount * rate).toFixed(2)} ${to}`;
    } catch {
      output.innerText = "Conversion failed";
    }
  });

  function setupDropdown(wrapper, defaultCode) {
    const list = wrapper.querySelector(".country-list");
    const display = wrapper.querySelector("div");

    list.innerHTML = "";

    currencies.forEach(country => {
      const item = document.createElement("div");
      item.className = "flex items-center gap-2 px-3 py-2 hover:bg-slate-600 cursor-pointer";
      item.innerHTML = `<img src="https://flagcdn.com/w20/${country.flag}.png" class="w-5 h-4"><span>${country.code} - ${country.name}</span>`;
      item.addEventListener("click", () => {
        display.innerHTML = `<img src="https://flagcdn.com/w20/${country.flag}.png" class="w-5 h-4"><span>${country.code}</span>`;
        display.dataset.value = country.code;
        list.classList.add("hidden");
      });
      list.appendChild(item);
      if (country.code === defaultCode) {
        display.innerHTML = `<img src="https://flagcdn.com/w20/${country.flag}.png" class="w-5 h-4"><span>${country.code}</span>`;
        display.dataset.value = country.code;
      }
    });

    wrapper.addEventListener("click", e => {
      e.stopPropagation();
      list.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
      list.classList.add("hidden");
    });
  }
});
