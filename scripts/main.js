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
btnClear.onclick = function clear(){
    currentVal = '0';
    display.innerText = currentVal;
    pendingVal = '0';
    evalStringArray = [];
}

/* Backspace */
btnBackspace.onclick = function backspace(){
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
    if(currentVal.length >= 9){
        return;
    }
    currentVal += clickObj.target.innerText;
    display.innerText = currentVal;
}

for (let i = 0; i < btnNumber.length; i++) {
    btnNumber[i].addEventListener("click", insertNumber, false);
}

/*keypress event*/
document.body.onkeypress = function(e){
    if(!isNaN(String.fromCharCode(e.keyCode)) && e.keyCode != 13){
        if (currentVal === '0') {
            currentVal = '';
        }
        if(currentVal.length >= 9){
            return;
        }
        currentVal += String.fromCharCode(e.keyCode);
        display.innerText = currentVal;
    }
    switch(e.keyCode){
        case 43: // plus
        case 45: // minus
        case 42: // multiply
        case 47: // division
        pendingVal = currentVal;
        currentVal = '0';
        display.innerText = currentVal;
        evalStringArray.push(pendingVal);
        evalStringArray.push(String.fromCharCode(e.keyCode));
        break;
        case 13: // equals
            evalStringArray.push(currentVal);
            var evaluation = eval(evalStringArray.join(' '));
            currentVal = evaluation + '';
            display.innerText = currentVal;
            evalStringArray = [];
        break;
    }
};

/*keydown event*/
document.body.onkeydown = function(e){
    switch(e.keyCode){
        case 27: // backspace
        currentVal = '0';
        display.innerText = currentVal;
        pendingVal = '0';
        evalStringArray = [];
        break;
        case 8: // clear
        if (currentVal.length == 1) {
            currentVal = '0';
        }
        else {
            currentVal = currentVal.slice(0, currentVal.length - 1);
        }
        break;
    }
    display.innerText = currentVal;
};

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