const BASE_URL = "https://api.frankfurter.app/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = true;
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = true;
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;

    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }

    const from = fromcurr.value;
    const to = tocurr.value;

    if (from === to) {
        msg.innerText = "Both currencies are the same.";
        return;
    }

    const URL = `${BASE_URL}?amount=${amtval}&from=${from}&to=${to}`;

    const response = await fetch(URL);
    const data = await response.json();
    const rate = data.rates[to];
    const finalAmount = rate;

    msg.innerText = `${amtval} ${from} = ${finalAmount} ${to}`;
});