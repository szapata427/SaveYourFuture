const initState = {
    currentTransactions: null
}

const fetchUsersTransactions = (state = initState, action) => {
    console.log(`${state} state for fetching users transactions in reducer, and action is ${action}`)
    switch(action.type) {
        case "FETCH_USERS_TRANSACTIONS":
            console.log('chaging state for users transactions in reducer')
            return {...state, currentTransactions: action.value}
    }
    return state
}

export default fetchUsersTransactions;