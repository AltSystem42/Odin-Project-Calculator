const display = document.querySelector(".screen")

window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`div[data-key="${e.keyCode}"`)
    if(!key) return; // stop function from running on bad key.
    if(["1","2","3","4","5","6","7","8","9","0", "(", ")", "÷", "x", "-", ".", "+"].includes(key.textContent)){
        display.textContent += key.textContent
    } else if (key.textContent === "C") {
        display.textContent = ""
    } else if (key.textContent === "="){
        let string = display.textContent;
        let total = operate(string[0], string[1], string[2])
        display.textContent = total;
    }
    
})

function operate(x, y, z) {
    x = parseInt(x)
    z = parseInt(z)
    switch(`${y}`){
        case `x`:
            return x * z;
        case '÷':
            return x / z;
        case '+':
            return x + z;
        case '-':
            return x - z;
    }
        
}