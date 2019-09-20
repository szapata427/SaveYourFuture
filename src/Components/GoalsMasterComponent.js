import React from 'react'
import AddGoal from './AddGoal'
import {url } from './TransactionsMasterComponent'


const GoalsMasterComponent = (props) => {

   const submitGoal = ({name, amount, notes, endDate}) => {
       console.log(props)
       let goalData = {
        UserId: props.user,
        Amount:amount,
        Name: name,
        EndDate: endDate,
        Notes: notes,
       }
        fetch(`${url}saveyourfuture/api/v1.0/AddGoal`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(goalData)
        })
        .then(response => response.json())
        .then(result => console.log(result))
    }
    return (
        <div>
            <div>Your Goals!</div>
            <AddGoal submitGoal={submitGoal}/>
        </div>
    )
}

export default GoalsMasterComponent