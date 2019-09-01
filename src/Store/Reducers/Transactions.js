const initState = {
    currentTransactions: []
}

const fetchUsersTransactions = (state = initState, action) => {
    console.log(state, 'current state of transactions')
    console.log(action.value)
    switch(action.type) {
        case "FETCH_USERS_TRANSACTIONS":
            let fetchedArray = action.value
            // let filteredByDateDesc = fetchedArray.sort(trans => {
            //     let firstDate = new Date(trans["CreatedOn"])
            //     let secondDate = new Date(trans["CreatedOn"])
            //     return secondDate - firstDate
            // })
            console.log('chaging state for users transactions in reducer')
            return {currentTransactions: fetchedArray}



        case "ADD_NEW_TRANSACTION":
            let newTrans = action.value
            let newStateArray = [newTrans, ...state.currentTransactions]
            console.log(action.value)
            return {currentTransactions: newStateArray}
        }
        
    return state
}

export default fetchUsersTransactions;