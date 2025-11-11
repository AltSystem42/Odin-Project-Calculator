const display = document.querySelector(".screen");

display.textContent = "0"
let currentInput = "";
let previousInput = "";
let operator = "";

//keyboard event listener
window.addEventListener("keydown", (e) => {
  handleInput(e.key);
  const key = document.querySelector(`[data-key="${e.key}"]`);
  if(!key) return;
  styleButton(key);
});

// mouse event listener
const keys = document.querySelectorAll(".key");
keys.forEach(btn => {
    btn.addEventListener("click", () =>{
        handleInput(btn.dataset.key)
        styleButton(btn);
    });
});

function styleButton(btn){
    btn.style.backgroundColor = "lightblue"
        setTimeout(() => {
            btn.style.backgroundColor = ""
        }, 150)
}

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
    case '/': return (Math.round((x / y) * 1000) / 1000);
  }
}

function handleInput(val){
    const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
    const operators = ['+','-','*','/'];

   // Handle numbers and decimal points
    if (numbers.includes(val)) {

    // Prevent more than one decimal point
        if (val === '.' && currentInput.includes('.')) {
        return; // ignore extra dot
        }
        if(currentInput.length >= 30)
        {
            return;
        } else {
            console.log(currentInput.length);
            currentInput += val;
            display.textContent = currentInput;
        }
        
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
        operator = ""; 
    } 
    //clear currentInput if enter/= is hit twice to keep number used.
    else if (currentInput && !operator) {
        display.textContent = currentInput;
        previousInput = currentInput;
        currentInput = "";
        operator = "";
    }
    }

    // Clear
    else if (val === "Delete") {
        display.textContent = "0";
        previousInput = "";
        currentInput = "";
        operator = "";
    }
    else if (val === "Backspace"){
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput || "0";
        if(currentInput === "" || currentInput === "0")
            previousInput = ""
    }
}