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

function getEquationValues(equationString) {
    let findOprArray = equationString;
    if (equationString.charAt(0) == "-") {
        findOprArray = equationString.slice(1);
    }
    let operator = findOprArray.split("").find(item => {
       return (item == "+" || item == "-" || item == "÷" || item == "x" || item == "%");
    })
    console.log(...equationString.split(operator));
    return [...equationString.split(operator), operator];
}

function getResult(equationString) {
    let num1;
    let num2;
    let opr;

    [num1,num2,opr] = getEquationValues(equationString);
    let result = operate((Number)(num1), opr, (Number)(num2));
    if (result === Infinity) {
        clearScreen();
        return Infinity;
    }

    if (!Number.isInteger(result)) {
        result = result.toFixed(2);
    }

    return result;
}

function clearScreen() {
    document.querySelector("#screen").textContent = "";
    eqnCheck = [false,false,false,false,false];
}

function isOperator(value) {
    return ["+","-","x","÷","%"].includes(value);
}

function handleKeyPress(event) {
    switch (event.key) {
        case "0" : document.querySelector("#number-0").click();break;
        case "1" : document.querySelector("#number-1").click();break;
        case "2" : document.querySelector("#number-2").click();break;
        case "3" : document.querySelector("#number-3").click();break;
        case "4" : document.querySelector("#number-4").click();break;
        case "5" : document.querySelector("#number-5").click();break;
        case "6" : document.querySelector("#number-6").click();break;
        case "7" : document.querySelector("#number-7").click();break;
        case "8" : document.querySelector("#number-8").click();break;
        case "9" : document.querySelector("#number-9").click();break;
        case "." : document.querySelector("#number-decimal").click();break;
        case "+" : document.querySelector("#opr-plus").click();break;
        case "-" : document.querySelector("#opr-minus").click();break;
        case "*" : document.querySelector("#opr-mult").click();break;
        case "/" : document.querySelector("#opr-div").click();break;
        case "%" : document.querySelector("#opr-mod").click();break;
        case "Backspace" : document.querySelector("#single-clear").click();break;
        case "Escape" : document.querySelector("#all-clear").click();break;
        case "Enter" : document.querySelector("#equal-btn").click();break;
        default : return;
    }
}

let eqnCheck = [false,false,false,false,false]; // for checking what values (num1, num2, operator, decimalCheck1, decimalCheck2) haven been input in the screen

const numberBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const clearBtns = document.querySelectorAll(".clear-btn");
const equalBtn = document.querySelector("#equal-btn");

numberBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const screen = document.querySelector("#screen");

        if (btn.textContent == ".") {
            if (screen.textContent == "") {
                screen.textContent = "0";
                eqnCheck[0] = true;
                eqnCheck[1] = true;
            }

            else if (eqnCheck[1] == true) {
                if (eqnCheck[4] == false) {
                    eqnCheck[4] = true;
                }
    
                else {
                    return;
                }
            }

            else {
                if (eqnCheck[3] == false) {
                    eqnCheck[3] = true;
                }
    
                else {
                    return;
                }
            }
        }

        else if (screen.textContent == ""){
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

clearBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const screen = document.querySelector("#screen");
        
        if (screen.textContent == "") {
            return;
        }
        else if (btn.id == "all-clear"){
            clearScreen();
        }
        else{
            const screenArr = screen.textContent.split("");
            const oldLast = screenArr.pop();
            const newLast = screenArr.pop();
            screen.textContent = screen.textContent.slice(0,-1);

            if (oldLast == ".") {
                if (eqnCheck[1] == true) {
                    eqnCheck[4] = false;
                }
                else {
                    eqnCheck[3] = false;
                }
            }

            if (isOperator(oldLast)) {
                eqnCheck[1] = false;
            }
            else {
                if (eqnCheck[2] == true) {
                    if (isOperator(newLast)){
                        eqnCheck[2] = false;
                    }
                }
                else if (eqnCheck[0] == true) {
                    if (newLast === undefined) {
                        eqnCheck[0] = false;
                    }
                }
            }
        }
    });
});

equalBtn.addEventListener("click", () => {
    const screen = document.querySelector("#screen");

    if (eqnCheck[2] == true) {
        const result = getResult(screen.textContent);
        if (result === Infinity) {
            return;
        }
        screen.textContent = result;
        eqnCheck[1] = false;
        eqnCheck[2] = false;
        eqnCheck[4] = false;
    }

    else if (eqnCheck[1] == false) {
        return;
    }

    else if (eqnCheck[1] == true) {
        screen.textContent = screen.textContent.slice(0,-1);
    }
});

document.addEventListener('keydown', handleKeyPress);