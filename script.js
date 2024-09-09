let display = document.getElementById("display");
let currentValue = '0';
let expression = '';
let hasEvaluated = false;

function updateDisplay(value) {
    display.innerHTML = value;
}

function appendNumber(number) {
    if (hasEvaluated) {
        currentValue = number;
        hasEvaluated = false;
        expression = '';
    } else {
        if (currentValue === '0') {
            currentValue = number;
        } else {
            currentValue += number;
        }
    }
    updateDisplay(expression + currentValue);
}

document.getElementById("one").addEventListener("click", () => appendNumber('1'));
document.getElementById("two").addEventListener("click", () => appendNumber('2'));
document.getElementById("three").addEventListener("click", () => appendNumber('3'));
document.getElementById("four").addEventListener("click", () => appendNumber('4'));
document.getElementById("five").addEventListener("click", () => appendNumber('5'));
document.getElementById("six").addEventListener("click", () => appendNumber('6'));
document.getElementById("seven").addEventListener("click", () => appendNumber('7'));
document.getElementById("eight").addEventListener("click", () => appendNumber('8'));
document.getElementById("nine").addEventListener("click", () => appendNumber('9'));
document.getElementById("zero").addEventListener("click", () => {
    if (currentValue !== '0') appendNumber('0');
});

document.getElementById("decimal").addEventListener("click", () => {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay(expression + currentValue);
    }
});

document.getElementById("clear").addEventListener("click", () => {
    currentValue = '0';
    expression = '';
    hasEvaluated = false;
    updateDisplay(currentValue);
});

function handleOperator(op) {
    if (hasEvaluated) {
        display.innerHTML = currentValue;
        hasEvaluated = false;
    }

    if (['+', '-', '*', '/'].includes(expression.slice(-1)) && op !== '-') {} else if (expression === '' && op === '-') {
        expression = currentValue + ' ' + op + ' ';
        currentValue = '';
        updateDisplay(expression);
        return;
    } else if (expression === '') {
        expression = currentValue + ' ' + op + ' ';
        currentValue = '';
        updateDisplay(expression);
        return;
    }

    expression += currentValue + ' ' + op + ' ';
    currentValue = '';
    updateDisplay(expression);
}

document.getElementById("add").addEventListener("click", () => handleOperator('+'));
document.getElementById("subtract").addEventListener("click", () => handleOperator('-'));
document.getElementById("multiply").addEventListener("click", () => handleOperator('*'));
document.getElementById("divide").addEventListener("click", () => handleOperator('/'));

document.getElementById("equals").addEventListener("click", () => {
    if (currentValue !== '') expression += currentValue;
    try {
        expression = expression.replace(/(\d)\s*[\+\-\*\/]\s*[\+\-\*\/]/g, '$1');
        let result = eval(expression);
        result = parseFloat(result.toFixed(4));
        updateDisplay(result);
        currentValue = result.toString();
        expression = '';
        hasEvaluated = true;
    } catch {
        updateDisplay("Error");
        currentValue = '0';
        expression = '';
    }
});