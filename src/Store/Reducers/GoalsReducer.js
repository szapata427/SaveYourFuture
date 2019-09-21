const initState = {
    currentGoals: []
}


 const goalsReducers = (state = initState, action) => {
    console.log(state)
    console.log(action)
    switch(action.type) {
        case "FETCH_GOALS":
            console.log('hit goals reducer for fetching goals')
            let fetchedArray = action.value
            console.log(fetchedArray)
            return {currentGoals: fetchedArray}
        
         default:
            return state
    }
}

export default goalsReducers;