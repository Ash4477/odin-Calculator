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
        return;
    }
    return num1 / num2;
}

function operate(first_number,operator,second_number){
    switch (operator) {
        case "+" : return add(first_number,second_number);
        
        case "-" : return substract(first_number,second_number);

        case "/" : return divide(first_number,second_number);

        case "x" : return multiply(first_number, second_number);

        default: alert("Invalid Operation");
    }
}

function getEquationValues(equationString) {
    let operator = equationString.split("").find(item => {
       return (item == "+" || item == "-" || item == "/" || item == "x" || item == "%");
    })
    console.log(operator);
    return [...equationString.split(operator), operator];
}

let eqnCheck = [false,false,false]; // for checking what values (num1, num2, or operator) haven been input in the screen

const numberBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const clearBtns = document.querySelectorAll(".clear-btn");
const equalBtn = document.querySelector("#equal-btn");

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const screen = document.querySelector("#screen");
        if (screen.textContent == "")
            eqnCheck[0] = true;
        
        else {
            if (eqnCheck[1] == true)
                eqnCheck[2] = true;
        }
        screen.textContent += btn.textContent;
    });
});
