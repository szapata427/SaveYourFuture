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
        case "ADD_GOAL":
            console.log('adding goal')
            let newGoal = action.value
            // newGoal["EndDate"] = newGoal["EndDate"].format('ddd D MMM YYYY')
            newGoal["isMomemnt"] = true
            let copyStateArrayWithNewGoal = [newGoal, ...state.currentGoals]
            return {currentGoals: copyStateArrayWithNewGoal}
        
         default:
            return state
    }
}

export default goalsReducers;