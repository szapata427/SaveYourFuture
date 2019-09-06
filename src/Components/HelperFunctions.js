
  export const checkIfAmountHasTwoDecimals = (inputValue) => {
    let inputstring;
    let inputDecimals;
    let inputBeforeDecimals;
    let hasDecimals;
    inputValue = parseFloat(inputValue);
    inputstring = inputValue.toString();
    hasDecimals = inputstring.indexOf(".");
    if (hasDecimals != -1) {
      var lastTwoDecimals = inputstring.split(".")[1];
      if (lastTwoDecimals.length === 2) {
  return true
      }
      else {
return false
      }
    }
  }


export const twoDecimalsNumber = (number) => {
  console.log(number)
  let newNumber;
  if (typeof number == "string") {
    number = parseFloat(number)
  }

  newNumber = number.toFixed(2)
  console.log(newNumber)
  return newNumber
}