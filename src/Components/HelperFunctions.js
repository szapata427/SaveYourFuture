export const checkIfAmountHasTwoDecimals = inputValue => {
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
      return true;
    } else {
      return false;
    }
  }
};

export const twoDecimalsNumber = number => {
  let newNumber;
  if (typeof number == "string") {
    number = parseFloat(number);
  }

  newNumber = number.toFixed(2);

  return newNumber;
};

export const totalAmountPerTransactionType = (transactionsArray, lastDays) => {
  let withdrawlSum = 0;
  let depositSum = 0;
  let date;
  let lastDaysDate;

  transactionsArray.forEach(trans => {
    if (lastDays != null) {
      date = new Date();
      lastDaysDate = date.setDate(date.getDate() - lastDays);

      if (Date.parse(trans.CreatedOn) >= lastDaysDate) {
        if (trans.Amount !== "number") {
          trans["Amount"] = parseFloat(trans.Amount);
        }

        if (trans.Type == "Withdrawl") {
          withdrawlSum += trans.Amount;
        } else if (trans.Type == "Deposit") {
          depositSum += trans.Amount;
        }
      }
    } else {
      if (trans.Amount !== "number") {
        trans["Amount"] = parseFloat(trans.Amount);
      }

      if (trans.Type == "Withdrawl") {
        withdrawlSum += trans.Amount;
      } else if (trans.Type == "Deposit") {
        depositSum += trans.Amount;
      }
    }
  });

  return { WithdrawlSum: withdrawlSum, DepositSum: depositSum };
};

export const fixDateDisplay = date => {
  console.log(date)
  let arrayDate;
  let stringDateWanted = "";

  if (date.isMoment == true) {
   let dateMomement = date.Date
    return dateMomement.format('ddd, D MMM YYYY')
  }
  if (typeof date == "string") {
    console.log(date);
    arrayDate = date.split(" ");
    if (arrayDate.length == 6) {
      // string contains gmt
      stringDateWanted = arrayDate.slice(0, 4).join(" ");
    }
  }
  return stringDateWanted;
};
