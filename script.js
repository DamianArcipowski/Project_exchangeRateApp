const swapBtn = document.getElementById("swap");
const firstList = document.getElementById("firstList");
const secondList = document.getElementById("secondList");
const firstAmount = document.getElementById("firstAmount");
const secondAmount = document.getElementById("secondAmount");
const exchangeRateP = document.querySelector(".exchangeRate");

function swapCurrencies(){
    var leftCrc = firstList.options[firstList.selectedIndex].value;
    var rightCrc = secondList.options[secondList.selectedIndex].value;
    
    firstList.value = rightCrc;
    secondList.value = leftCrc;
}

var requestURL = 'https://api.exchangerate.host/latest';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();


function showCurrencies(){
    var response = request.response;
    
    pln = response.rates.PLN;
    chf = response.rates.CHF;
    usd = response.rates.USD;
    gbp = response.rates.GBP;
    eur = response.rates.EUR;
}

request.onload = function(){
    showCurrencies();

    const nameAndVal = {
        'PLN': pln,
        'CHF': chf,
        'USD': usd,
        'GBP': gbp,
        'EUR': eur
    };
    
    function calculateAmount(){
        var leftCrc = firstList.options[firstList.selectedIndex].value;
        var rightCrc = secondList.options[secondList.selectedIndex].value;
        secondAmount.value = (firstAmount.value * nameAndVal[rightCrc]/nameAndVal[leftCrc]).toFixed(2);
    }

    firstAmount.addEventListener("change", calculateAmount);
    firstList.addEventListener("change", calculateAmount);
    secondList.addEventListener("change", calculateAmount);
    swapBtn.addEventListener("click", calculateAmount);

            
    function calculateRate(){
        var leftCrc = firstList.options[firstList.selectedIndex].value;
        var rightCrc = secondList.options[secondList.selectedIndex].value;
        const divideCrc = nameAndVal[rightCrc]/nameAndVal[leftCrc];

            switch(leftCrc){
                case 'EUR':
                    exchangeRateP.textContent = `1 ${leftCrc} = ${(nameAndVal[rightCrc]).toFixed(4)} ${rightCrc}`;
                break;
                case 'PLN':
                    exchangeRateP.textContent = `1 ${leftCrc} = ${divideCrc.toFixed(4)} ${rightCrc}`;
                break;
                case 'USD':
                    exchangeRateP.textContent = `1 ${leftCrc} = ${divideCrc.toFixed(4)} ${rightCrc}`;
                break;
                case 'GBP':
                    exchangeRateP.textContent = `1 ${leftCrc} = ${divideCrc.toFixed(4)} ${rightCrc}`;
                break;
                case 'CHF':
                    exchangeRateP.textContent = `1 ${leftCrc} = ${divideCrc.toFixed(4)} ${rightCrc}`;
                break;
            }
    }

    firstAmount.addEventListener("change", calculateRate);
    firstList.addEventListener("change", calculateRate);
    secondList.addEventListener("change", calculateRate);
    swapBtn.addEventListener("click", calculateRate);
}
    
swapBtn.addEventListener("click", swapCurrencies);