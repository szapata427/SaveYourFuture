const initState = {
  currentTransactions: []
};

const fetchUsersTransactions = (state = initState, action) => {
  console.log(state, "current state of transactions");
  console.log(action.value);
  switch (action.type) {
    case "FETCH_USERS_TRANSACTIONS":
      let fetchedArray = action.value;
      return { currentTransactions: fetchedArray };

    case "ADD_NEW_TRANSACTION":
      let newTrans = action.value;
      let newStateArray = [newTrans, ...state.currentTransactions];
      return { currentTransactions: newStateArray };

    case "FILTERED_TRANSACTIONS_COMPLETE":
      let allFilteredTrans = action.value;
      return { currentTransactions: allFilteredTrans };

      case "RESET_TRANSACTIONS":
          return {currentTransactions: []}
  }

  return state;
};

export default fetchUsersTransactions;
