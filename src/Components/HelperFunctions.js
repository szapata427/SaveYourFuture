
  export const checkIfAmountHasTwoDecimals = (inputValue) => {
    let inputstring;
    let inputDecimals;
    let inputBeforeDecimals;
    let hasDecimals;
    inputValue = parseFloat(inputValue);
    inputstring = inputValue.toString();
    hasDecimals = inputstring.indexOf(".");
    console.log(hasDecimals);
    if (hasDecimals != -1) {
      var lastTwoDecimals = inputstring.split(".")[1];
      if (lastTwoDecimals.length === 2) {
        console.log("hit two decimals", lastTwoDecimals);
  return true
      }
      else {
return false
      }
    }
  }