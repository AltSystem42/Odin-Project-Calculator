const display = document.querySelector(".screen");

let currentInput = "";
let previousInput = "";
let operator = "";

window.addEventListener("keydown", (e) => {
  const val = e.key;
  const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
  const operators = ['+','-','*','/'];

  // If it's a number
  if (numbers.includes(val)) {
    currentInput += val;
    display.textContent = currentInput;
  }

  // If it's an operator
  else if (operators.includes(val)) {
    if (previousInput && operator && currentInput) {
      const result = operate(previousInput, operator, currentInput);
      if (result === "Error") {
        display.textContent = "Error";
        previousInput = "";
        currentInput = "";
        operator = "";
        return;
      }
      display.textContent = result;
      previousInput = String(result);
      currentInput = "";
    } else if (currentInput) {
      previousInput = currentInput;
      currentInput = "";
    }
    operator = val;
  }

  // Enter
  else if (val === "Enter") {
    if (previousInput && operator && currentInput) {
      const result = operate(previousInput, operator, currentInput);
      if (result === "Error") {
        display.textContent = "Error";
        previousInput = "";
        currentInput = "";
        operator = "";
        return;
      }
      display.textContent = result;
      previousInput = String(result);
      currentInput = "";
    }
  }

  // Clear
  else if (val === "Delete" || val === "Backspace") {
    display.textContent = "";
    previousInput = "";
    currentInput = "";
    operator = "";
  }
});

function operate(x, op, y) {
  x = parseFloat(x);
  y = parseFloat(y);

  if (op === '/' && y === 0) {
    return "Error";
  }

  switch (op) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
    case '/': return x / y;
  }
}
