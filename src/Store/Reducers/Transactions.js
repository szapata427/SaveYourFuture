const initState = {
    currentTransactions: null
}

const fetchUsersTransactions = (state = initState, action) => {
    console.log(state, 'current state of transactions')
    console.log(action.value)
    switch(action.type) {
        case "FETCH_USERS_TRANSACTIONS":
            console.log('chaging state for users transactions in reducer')
            return {...state, currentTransactions: action.value}
        case "ADD_NEW_TRANSACTION":
            let newTrans = action.value
            console.log(action.value)
            return [...state.currentTransactions, newTrans]
        }
        
    return state
}

export default fetchUsersTransactions;