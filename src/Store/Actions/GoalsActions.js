import {databaseurl} from '../../App'


export const fetchGoals = (userId) => {
    let urlWithUserId = `${databaseurl}UsersGoals?UserId=${userId}`
    return dispatch => {
        return fetch(urlWithUserId)
        .then(response => response.json())
        .then(data => dispatch({type:'FETCH_GOALS', value: data.result}))
    }

}

export const addGoal = (goal) => {
    return dispatch => {
        return fetch(`${databaseurl}AddGoal`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(goal)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.result.Success == true ) {
            console.log('goal was added')
            dispatch({type: "ADD_GOAL", value: goal})
        }
    }).catch(error => console.log(error))
    }
}

export const editGoal = (goalObject) => {
    return ({
        type: "EDIT_GOAL",
        value: goalObject
    })
}