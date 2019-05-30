/* Global Variables */
var currentVal = '0';
var pendingVal = '0';
var evalStringArray = [];

var btnBackspace = document.getElementById("calc-backspace");
var btnNumber = document.getElementsByClassName("num");
var btnOperator = document.getElementsByClassName("operator");
var btnClear = document.getElementById("calc-clear");
var btnDecimal = document.getElementById("calc-decimal");
var display = document.getElementById("display");

/* Decimal */
btnDecimal.onclick = () => {
    if (currentVal === '0') {
        currentVal = '';
    }
    if (!currentVal.includes('.')) {
        currentVal += '.';
    }
    display.innerText = currentVal;
}

/* Clear */
btnClear.onclick = () => {
    currentVal = '0';
    display.innerText = currentVal;
    pendingVal = '0';
    evalStringArray = [];
}

/* Backspace */
btnBackspace.onclick = () => {
    if (currentVal.length == 1) {
        currentVal = '0';
    }
    else {
        currentVal = currentVal.slice(0, currentVal.length - 1);
    }
    display.innerText = currentVal;
}


/* Numbers */
var insertNumber = (clickObj) => {
    if (currentVal === '0') {
        currentVal = '';
    }
    currentVal += clickObj.target.innerText;
    display.innerText = currentVal;
}

for (let i = 0; i < btnNumber.length; i++) {
    btnNumber[i].addEventListener("click", insertNumber, false);
}

/* Operators */
var insertOperator = (clickObj) => {
    switch (clickObj.target.innerText) {
        case '+':
        case '-':
        case '*':
        case '/':
            setVal(clickObj.target.innerText);
            break;
        default:
            evalStringArray.push(currentVal);
            var evaluation = eval(evalStringArray.join(' '));
            currentVal = evaluation + '';
            display.innerText = currentVal;
            evalStringArray = [];
            break;
    }
}

function setVal(operation) {
    pendingVal = currentVal;
    currentVal = '0';
    display.innerText = currentVal;
    evalStringArray.push(pendingVal);
    evalStringArray.push(operation);
}

for (let i = 0; i < btnOperator.length; i++) {
    btnOperator[i].addEventListener("click", insertOperator, false);
}