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

        case "*" : return multiply(first_number, second_number);

        default: alert("Invalid Operation");
    }
}

