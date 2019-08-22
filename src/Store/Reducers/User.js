const initState = {
    user: ""
}

const userReducer = (state = initState, action) => {
    console.log('THIS IS THE STATE OF THE USER', state, action.type)
    switch(action.type) {
        case "CURRENT_USER":
            console.log('user reducer', action.value)
            return {...state, user: action.value}
    }
    return state
}

export default userReducer;