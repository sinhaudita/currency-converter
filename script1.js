const addBtn = document.querySelector(".addbtn");//button
const fullList=document.querySelector(".currlist");//entire list-second page
const newList=document.querySelector(".newcurr")//current list to be displayed-first page


const dataURL = "https://v6.exchangerate-api.com/v6/fc9e058356c9e406962599ed/latest/USD";
//display some initial currency names
const initialDisplay = ["USD", "EUR", "INR", "JPY", "AUD"];
let basecurr;
let basecurramt;


addBtn.addEventListener("click", addBtnClick);
function addBtnClick(){
    addBtn.classList.toggle("open");
}

//function to add currencies from full list of currencies to front page; only those which are not previously added
fullList.addEventListener("click",addCurrency );
function addCurrency(e){
  const item = e.target.closest("li");
  if(!item.classList.contains("disabled")){
    const newItem = currencies.find(c=> c.abbreviation===item.getAttribute("data-currency"));
    if(newItem)
    newCurrList(newItem)
  }
}
//fn to activate remove button from front page
newList.addEventListener("click", function removeItems(e){
  if(e.target.classList.contains("close")){
    const parentNode=e.target.parentNode;
    console.log(parentNode);
    parentNode.remove();
    fullList.querySelector(`[data-currency=${parentNode.id}]`).classList.remove("disabled");
    if(parentNode.classList.contains("base-currency"))
    {
      const newbase= newList.querySelector(".currency");
      if(newbase)
      newBaseCurr(newbase);
      basecurramt = Number(newBaseCurr.querySelector(".input input").value);         
      // ****check this
    }
  }
  
});
//if base currency is deleted then immediate next curr becomes base curr----> change every attribute of changed curr, abbreviation,rate etc
function newBaseCurr(newbase){
  newbase.classList.add("base-currency");
  basecurr= newbase.id;
  const basecurrRate = currencies.find(c => c.abbreviation === basecurr).conversion_rates
  ;
  newList.querySelectorAll(".currency").forEach(items => {
    const currRate = currencies.find(c => c.abbreviation === items.id).conversion_rates;
    const exchangeRate = items.id === basecurr ? 1 : (currRate / basecurrRate).toFixed(4);
    items.querySelector(".base-curr-rate").textContent=`1 ${basecurr} = ${exchangeRate} ${items.id}`; //works perfect
  });
}

//add input to placeholder
newList.addEventListener("input", function changeInput(e){
  const isbaseCurrNew = e.target.closest("li").id!==basecurr;
  if(isbaseCurrNew) {
    newList.querySelector(`#${basecurr}`).classList.remove("base-currency");
    newBaseCurr(e.target.closest("li"));
  }
  const baseCurrNewAmt= isNaN(e.target.value)?0: Number(e.target.value);
  if(basecurramt!==baseCurrNewAmt || isbaseCurrNew) {
    basecurramt = baseCurrNewAmt;
    const basecurrRate = currencies.find(c => c.abbreviation === basecurr).conversion_rates;
    newList.querySelectorAll(".currency").forEach(items => {
    if(items!==basecurr){
      const currRate = currencies.find(c => c.abbreviation === items.id).conversion_rates;
    const exchangeRate = items.id === basecurr ? 1 : (currRate / basecurrRate).toFixed(4);
    items.querySelector(".input input").value= (exchangeRate * basecurramt)!==0 ? (exchangeRate * basecurramt).toFixed(4) : "";
    }
    
  });
} });

newList.addEventListener("keydown", function keyboard(e){
  if(e.key==="Enter")
  e.target.blur();
});

let currencies = [
    {
      name: "US Dollar",
      abbreviation: "USD",
      symbol: "\u0024",
      flagURL: "https://flagsapi.com/US/shiny/64.png",
      // rate: 1.1325
    },
    {
      name: "Euro",
      abbreviation: "EUR",
      symbol: "\u20AC",
      flagURL: "https://flagsapi.com/FI/shiny/64.png"
    },
    {
      name: "Japanese Yen",
      abbreviation: "JPY",
      symbol: "\u00A5",
      flagURL: "https://flagsapi.com/JP/shiny/64.png",
      // rate: 125.5600
    },
    {
      name: "British Pound",
      abbreviation: "GBP",
      symbol: "\u00A3",
      flagURL: "https://flagsapi.com/GB/shiny/64.png",
      // rate: 0.8726
    },
    {
      name: "Australian Dollar",
      abbreviation: "AUD",
      symbol: "\u0024",
      flagURL: "https://flagsapi.com/AU/shiny/64.png",
      // rate: 1.5923
    },
    {
      name: "Canadian Dollar",
      abbreviation: "CAD",
      symbol: "\u0024",
      flagURL: "https://flagsapi.com/CA/shiny/64.png"
    },
    {
      name: "Swiss Franc",
      abbreviation: "CHF",
      symbol: "\u0043\u0048\u0046",
      flagURL: "https://flagsapi.com/FR/shiny/64.png"
    },
    {
      name: "Chinese Yuan Renminbi",
      abbreviation: "CNY",
      symbol: "\u00A5",
      flagURL: "https://flagsapi.com/CN/shiny/64.png"
    },
    {
      name: "Swedish Krona",
      abbreviation: "SEK",
      symbol: "\u006B\u0072",
      flagURL: "https://flagsapi.com/SE/shiny/64.png"
    },
    {
      name: "New Zealand Dollar",
      abbreviation: "NZD",
      symbol: "\u0024",
      flagURL: "https://flagsapi.com/NZ/shiny/64.png"
    },
    {
      name: "Mexican Peso",
      abbreviation: "MXN",
      symbol: "\u0024",
      flagURL: "https://flagsapi.com/MX/shiny/64.png"
    },
    {
      name: "Singapore Dollar",
      abbreviation: "SGD",
      symbol: "\u0024",
      flagURL: "https://flagsapi.com/SG/shiny/64.png"
    },
    {
      name: "Hong Kong Dollar",
      abbreviation: "HKD",
      symbol: "\u0024",
      flagURL: "https://flagsapi.com/HK/shiny/64.png"
    },
    {
      name: "Norwegian Krone",
      abbreviation: "NOK",
      symbol: "\u006B\u0072",
      flagURL: "https://flagsapi.com/NO/shiny/64.png"
    },
  //   {
  //     name: "South Korean Won",
  //     abbreviation: "KRW",
  //     symbol: "\u20A9",
  //     flagURL: "https://flagsapi.com/NO/shiny/64.png"
  //   },
    {
      name: "Turkish Lira",
      abbreviation: "TRY",
      symbol: "\u20BA",
      flagURL: "https://flagsapi.com/TC/shiny/64.png"
    },
    {
      name: "Russian Ruble",
      abbreviation: "RUB",
      symbol: "\u20BD",
      flagURL: "https://flagsapi.com/RU/shiny/64.png"
    },
    {
      name: "Indian Rupee",
      abbreviation: "INR",
      symbol: "\u20B9",
      flagURL: "https://flagsapi.com/IN/shiny/64.png",
      rate: 0.011
    },
    {
      name: "Brazilian Real",
      abbreviation: "BRL",
      symbol: "\u0052\u0024",
      flagURL: "https://flagsapi.com/BR/shiny/64.png"
    },
    {
      name: "South African Rand",
      abbreviation: "ZAR",
      symbol: "\u0052",
      flagURL: "https://flagsapi.com/ZA/shiny/64.png"
    },
    {
      name: "Philippine Peso",
      abbreviation: "PHP",
      symbol: "\u20B1",
      flagURL: "https://flagsapi.com/PH/shiny/64.png"
    },
    {
      name: "Czech Koruna",
      abbreviation: "CZK",
      symbol: "\u004B\u010D",
      flagURL: "https://flagsapi.com/CZ/shiny/64.png"
    },
    {
      name: "Indonesian Rupiah",
      abbreviation: "IDR",
      symbol: "\u0052\u0070",
      flagURL: "https://flagsapi.com/ID/shiny/64.png"
    },
    {
      name: "Malaysian Ringgit",
      abbreviation: "MYR",
      symbol: "\u0052\u004D",
      flagURL: "https://flagsapi.com/MY/shiny/64.png"
    },
    {
      name: "Hungarian Forint",
      abbreviation: "HUF",
      symbol: "\u0046\u0074",
      flagURL: "https://flagsapi.com/HU/shiny/64.png"
    },
  //   {
  //     name: "Icelandic Krona",
  //     abbreviation: "ISK",
  //     symbol: "\u006B\u0072",
  //     flagURL: "http://www.geonames.org/flags/l/is.gif"
  //   },
  //    {
  //     name: "Croatian Kuna",
  //     abbreviation: "HRK",
  //     symbol: "\u006B\u006E",
  //     flagURL: "http://www.geonames.org/flags/l/hr.gif"
  //   },
    {
      name: "Bulgarian Lev",
      abbreviation: "BGN",
      symbol: "\u043B\u0432",
      flagURL: "https://flagsapi.com/BG/shiny/64.png"
    },
    {
      name: "Romanian Leu",
      abbreviation: "RON",
      symbol: "\u006C\u0065\u0069",
      flagURL: "https://flagsapi.com/RO/shiny/64.png"
    },
    {
      name: "Danish Krone",
      abbreviation: "DKK",
      symbol: "\u006B\u0072",
      flagURL: "https://flagsapi.com/DK/shiny/64.png"
    },
    {
      name: "Thai Baht",
      abbreviation: "THB",
      symbol: "\u0E3F",
      flagURL: "https://flagsapi.com/TH/shiny/64.png"
    },
    {
      name: "Polish Zloty",
      abbreviation: "PLN",
      symbol: "\u007A\u0142",
      flagURL: "https://flagsapi.com/PL/shiny/64.png"
    },
    {
      name: "Israeli Shekel",
      abbreviation: "ILS",
      symbol: "\u20AA",
      flagURL: "https://flagsapi.com/IL/shiny/64.png"
    }
  ];

//adding all the currency to the full list which appears when we have to add currency
function addCurrList(){
    for(i=0;i<currencies.length;i++)
    {
        fullList.insertAdjacentHTML(
            "beforeend", 
            `<li data-currency=${currencies[i].abbreviation}>
              <img src=${currencies[i].flagURL} class="flag">
              <p>${currencies[i].abbreviation} - ${currencies[i].name}</p>
            </li>`
          );
    }
}



//adding the initial currency names to the first page
function addInitialList(){
    for(i=0;i<initialDisplay.length;i++)
    {
        const curr=currencies.find(c=> c.abbreviation===initialDisplay[i]);
        if(curr) newCurrList(curr);//calling the fn that adds item to front page curr list
        
    }
}

//creating the function that adds all the selected items to first page
// function newCurrList(curr){
//     if(newList.childElementCount===0){
//         basecurr=curr.abbreviation;
//         basecurramt=0;
//     }
//     // fullList.querySelector(`[data-currency=${curr.abbreviation}]`).classList.add("disabled");
//     const basecurrRate = currencies.find(c => c.abbreviation===basecurr).rate;
//     const exchangeRate = curr.abbreviation===basecurr ? 1 : (curr.rate/basecurrRate).toFixed(4);
//     const inputValue = basecurramt ? (basecurramt*exchangeRate).toFixed(4) : "";

//     newList.insertAdjacentElement(
//         "beforeend",
//         `<li class="currency ${curr.abbreviation===basecurr?"base-currency":""}" id=${curr.abbreviation}>
//         <img src=${curr.flagURL} class="flag">
//         <div class="info">
//           <p class="input"><span class="curr-sym">${curr.symbol}</span>
//           <input placeholder="0.0000" value=${inputValue}></p>
//           <p class="curr-name">${curr.abbreviation} - ${curr.name}</p>
//           <p class="base-curr-rate">1 ${basecurr} = ${exchangeRate} ${curr.abbreviation}</p>
//         </div>
//         <span class="close">&#8722;</span>
//       </li>`
//     );
// }


function newCurrList(curr) {
    if (newList.childElementCount === 0) {
        basecurr = curr.abbreviation;
        basecurramt = 0;
    }
    fullList.querySelector(`[data-currency=${curr.abbreviation}]`).classList.add("disabled");
    const basecurrRate = currencies.find(c => c.abbreviation === basecurr).conversion_rates;
    const exchangeRate = curr.abbreviation === basecurr ? 1 : (curr.conversion_rates / basecurrRate).toFixed(4);
    const inputValue = basecurramt ? (basecurramt * exchangeRate).toFixed(4) : "";

    // Create a new li element
    const liElement = document.createElement('li');
    liElement.classList.add('currency');
    if (curr.abbreviation === basecurr) {
        liElement.classList.add('base-currency');
    }
    liElement.id = curr.abbreviation;

    // Set innerHTML for the li element
    liElement.innerHTML = `
        <img src=${curr.flagURL} class="flag">
        <div class="info">
            <p class="input"><span class="curr-sym">${curr.symbol}</span>
            <input placeholder="0.0000" value=${inputValue}></p>
            <p class="curr-name">${curr.abbreviation} - ${curr.name}</p>
            <p class="base-curr-rate">1 ${basecurr} = ${exchangeRate} ${curr.abbreviation}</p>
        </div>
        <span class="close">&#8722;</span>
    `;

    // Insert the li element into newList using insertAdjacentElement
    newList.insertAdjacentElement('beforeend', liElement);
}


//fetching api 
fetch(dataURL).then(response=> response.json())
.then(data =>{
   console.log(data);
  
  document.querySelector(".time_last_update_utc").textContent= data.time_last_update_utc;
  data.conversion_rates["EUR"] = 1;
  currencies = currencies.filter(currency => data.conversion_rates[currency.abbreviation]);
  currencies.forEach(currency => currency.conversion_rates = data.conversion_rates[currency.abbreviation]);
  addCurrList();
  addInitialList();
})
.catch(error => console.log(error));
