/*Concepts learned
  1. Array
  2. Type casting
  3. The DOM
  4. if conditional
  5. NaN
  6. Events
  7. logical operators
  */

//started on 14th july.
//anything typed onto the DOM is of string type so for performing operations on the numbers correctly we need to first change all of that to correct type which in this case is integer and decimal.

//TODO: how to access first number.

//PROBLEM WITH BELOW CODE DOESN'T WORK AT RUN TIME
/*
  const input = document.querySelectorAll(".calc-button");
  //querySelectorAll returns an array so input is an array.
  const num1 = []; //declaration of an empty array that will store the first number.
  let j = 0;
  for (let i = 0; i < input.length; i++) {
      input[i].addEventListener("click", function () {
      num1[j] = Number(input[i].innerText); //Type casting of string to number datatype.
      j++;
      //console.log(num1);
    });
  }
  let number1 = "";
  let number2 = "";
  let operation;
  let operationAtIndex;
  let k; 
  for (k = 0; k < num1.length; k++) {
    if (num1[k] === NaN) {
      operation = String(num1[k]); //for storing operation.
      operationAtIndex = k;
      console.log(operation);
      console.log(operationAtIndex);
    }
  }
  for (let l = 0; l < k; l++) {
    number1 = number1 + String(num1[l]); //string
  }
  console.log("Number1 = ", Number(number1));
  for (let l = k + 1; l < num1.length; l++) {
    number2 = number2 + String(num1[l]); //string
  }

  console.log("Number2 = ", Number(number2));
  */
/*
 **
 * @start
 */
//INSTEAD USE event.target.innerText and pass it to the functions where one function deals with the numbers and the other function deals with the operator.

//start from here...

let runningTotal = 0; //keeps track of previous entered number.
let buffer = "0"; //taken as string as everything in DOM is a string and keeps track of the latest value visible on screen.
let previousOperator = null; //keeps track of the previousOperator entered by the user.

const screen = document.querySelector(".calc-screen"); //screen selected

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    //over here we are creating two paths one for handling number and other for handling symbols. As we know everything in DOM is string so first we convert that to integer using parsInt function and then check whether its a number or not.
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value; //appending
  }
}

function handleSymbol(value) {
  //better to use switch case instead of if as we have multiple choices to make.
  switch (value) {
    case "C":
      buffer = "0"; //needs to be string...better //TODO:?
      previousOperator = null;
      break;

    case "=":
      if (previousOperator === null) {
        //if nothing has been assigned to previousOperator. For eg - user keeps on pressing equal to for no reason  then nothing shoild happen and that's achieved through return; stmt.
        return; //means skip the rest of this function and just get out of here.
      }
      flushOperation(parseInt(buffer)); //FLUSHoperation is for committing arithmetic operations.//TODO:?
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    default: //TODO:
      // function for handling operations +-*/
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  runningTotal = intBuffer;
  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}
