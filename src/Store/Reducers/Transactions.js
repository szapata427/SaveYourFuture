const initState = {
    currentTransactions: []
}

const fetchUsersTransactions = (state = initState, action) => {
    console.log(state, 'current state of transactions')
    console.log(action.value)
    switch(action.type) {
        case "FETCH_USERS_TRANSACTIONS":
            console.log('chaging state for users transactions in reducer')
            return {currentTransactions: action.value}



        case "ADD_NEW_TRANSACTION":
            let newTrans = action.value
            let newStateArray = [...state.currentTransactions, newTrans]
            console.log(action.value)
            return {currentTransactions: newStateArray}
        }
        
    return state
}

export default fetchUsersTransactions;