// export const FETCH_TRANSACTIONS_BEGIN = "FETCH_TRANSACTIONS_BEGIN";
// export const FETCH_TRANSACTIONS_SUCCESS = "FETCH_TRANSACTIONS_SUCCESS";
// export const FETCH_TRANSACTIONS_FAILURE = "FETCH_TRANSACTIONS_FAILURE";
import {url} from '../../Components/TransactionsMasterComponent'

export const fetchUsersTransactions = (user) => {
    console.log(`user information being sent to transactions action to fetch ${user}`)
  return dispatch => {
    return fetch(
      `${url}saveyourfuture/api/v1.0/UsersTransactions?UserId=${user.user.Id}`
    )
      .then(response => response.json())
      .then(data => {
          console.log(`data form the fetch ${data}`)
          dispatch({type: 'FETCH_USERS_TRANSACTIONS', value: data})});
  };
};
