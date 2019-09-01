const initState = {
    user: ""
}

const userReducer = (state = initState, action) => {
    console.log(state, 'state')
    switch(action.type) {
        case "CURRENT_USER":
            console.log('user reducer', action.value)
            return {...state, user: action.value}
        
        case "DELETE_USER":
            console.log('deleting user reducer')
            return {user: ""}
    }
    return state
}

export default userReducer;