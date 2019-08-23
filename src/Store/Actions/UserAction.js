

export const currentUser = (theuser) => {
    console.log('hit the action for user')
    return {type: "CURRENT_USER", value: theuser}
}

export const deleteUser = () => {
    console.log('deleting the user')
    return {type: "DELETE_USER", value: ""}
}