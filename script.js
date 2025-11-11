const display = document.querySelector(".screen");

let currentInput = "";
let previousInput = "";
let operator = "";

window.addEventListener("keydown", (e) => {
  const val = e.key;
  const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
  const operators = ['+','-','*','/'];

   // Handle numbers and decimal points
  if (numbers.includes(val)) {

    // Prevent more than one decimal point
    if (val === '.' && currentInput.includes('.')) {
      return; // ignore extra dot
    }

    currentInput += val;
    display.textContent = currentInput;
  }

  // If it's an operator
  else if (operators.includes(val)) {
    if (previousInput && operator && currentInput) {
      const result = operate(previousInput, operator, currentInput);
      if (result === "Ha you're funny") {
        display.textContent = "Ha you're funny";
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
      if (result === "Ha you're funny") {
        display.textContent = "Ha you're funny";
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
  else if (val === "Delete") {
    display.textContent = "";
    previousInput = "";
    currentInput = "";
    operator = "";
  }
  else if (val === "Backspace"){
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || "0";
  }
});

function operate(x, op, y) {
  x = parseFloat(x);
  y = parseFloat(y);

  if (op === '/' && y === 0) {
    return "Ha you're funny";
  }

  switch (op) {
    case '+': return x + y;
    case '-': return x - y;
    case '*': return x * y;
    case '/': return (Math.round((x / y) * 100000000) / 100000000);
  }
}

