function add(num1,num2) {
    return num1 + num2;
}
function substract(num1,num2) {
    return num1 - num2;
}
function multiply(num1,num2) {
    return num1 * num2;
}
function divide(num1,num2) {
    if (num2 === 0) {
        alert("😵‍💫");
        return Infinity;
    }
    return num1 / num2;
}

function operate(first_number,operator,second_number){
    switch (operator) {
        case "+" : return add(first_number,second_number);
        
        case "-" : return substract(first_number,second_number);

        case "÷" : return divide(first_number,second_number);

        case "x" : return multiply(first_number, second_number);

        default: alert("Invalid Operation");
    }
}

// error for negative first number
function getEquationValues(equationString) {
    let operator = equationString.split("").find(item => {
       return (item == "+" || item == "-" || item == "÷" || item == "x" || item == "%");
    })
    console.log(operator);
    return [...equationString.split(operator), operator];
}

function getResult(equationString) {
    let num1;
    let num2;
    let opr;

    [num1,num2,opr] = getEquationValues(equationString);
    const result = operate((Number)(num1), opr, (Number)(num2));
    if (result === Infinity) {
        clearScreen();
        return Infinity;
    }
    return result;
}

function clearScreen() {
    document.querySelector("#screen").textContent = "";
    eqnCheck = [false,false,false];
}

let eqnCheck = [false,false,false]; // for checking what values (num1, num2, or operator) haven been input in the screen

const numberBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const clearBtns = document.querySelectorAll(".clear-btn");
const equalBtn = document.querySelector("#equal-btn");

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const screen = document.querySelector("#screen");
        if (screen.textContent == ""){
            eqnCheck[0] = true;
        }
        
        else {
            if (eqnCheck[1] == true){
                eqnCheck[2] = true;
            }
        }
        screen.textContent += btn.textContent;
    });
});

operatorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const screen = document.querySelector("#screen");
        // fix later
        if (screen.textContent == "") {
            if (btn.textContent == "-"){
                eqnCheck[0] = true;
                screen.textContent = "-";
            }
            return;
        }

        else if (eqnCheck[1] == true && eqnCheck[2] == false){
            screen.textContent = screen.textContent.slice(0,-1);
        }

        else if (eqnCheck[2] == true) {
            eqnCheck[2] = false;
            const result = getResult(screen.textContent);
            if (result === Infinity) {
                return;
            }
            screen.textContent = result;
        }
        eqnCheck[1] = true;
        screen.textContent += btn.textContent;
    });
});


equalBtn.addEventListener("click", () => {
    const screen = document.querySelector("#screen");

    if (eqnCheck[2] == true) {
        screen.textContent = getResult(screen.textContent);
        eqnCheck = [true, false, false];
    }

    else if (eqnCheck[1] == false) {
        return;
    }

    else if (eqnCheck[1] == true) {
        screen.textContent = screen.textContent.slice(0,-1);
    }
});