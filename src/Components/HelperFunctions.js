
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