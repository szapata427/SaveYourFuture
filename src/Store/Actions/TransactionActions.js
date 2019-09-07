// export const FETCH_TRANSACTIONS_BEGIN = "FETCH_TRANSACTIONS_BEGIN";
// export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
// export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE";
import {url} from '../../Components/TransactionsMasterComponent'

export const fetchUsersTransactions = (userId, days=null) => {
  console.log(userId, days)
  let urlFetch = `${url}saveyourfuture/api/v1.0/UsersTransactions?UserId=${userId}`

  if (days !== null) {
    urlFetch = `${url}saveyourfuture/api/v1.0/UsersTransactions?UserId=${userId}&LastDays=${days}`
  }
    console.log(`user information being sent to transactions action to fetch ${userId}`)
  return dispatch => {
    return fetch(
      urlFetch
    )
      .then(response => response.json())
      .then(data => {
          console.log(`data form the fetch ${data}`)
          dispatch({type: 'FETCH_USERS_TRANSACTIONS', value: data.result})});
  };
};


export const addTransactionToCurrent = (transInfo) => {
   return ({
        type: "ADD_NEW_TRANSACTION", value: transInfo
    })
}

export const filteredTransactions = (allFilteredtransactions) => {
  return ({
    type: "FILTERED_TRANSACTIONS_COMPLETE", value: allFilteredtransactions
  })
}