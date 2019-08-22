

export const currentuser = (theuser) => {
    console.log('hit the action for user')
    return {type: "CURRENT_USER", value: theuser}
}