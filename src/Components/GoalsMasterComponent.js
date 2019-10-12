import React, { useState, useEffect, useReducer } from "react";
import AddGoal from './AddGoal'
import GoalsIndividualGoalComponent from './GoalsIndividualGoalComponent'
import {url } from './TransactionsMasterComponent'
import { connect } from "react-redux";
import {addGoal} from '../Store/Actions/GoalsActions'
import {fetchGoals} from '../Store/Actions/GoalsActions'



class GoalsMasterComponent extends React.Component {

componentDidMount() {
    console.log(this.props)
    console.log('componentDidMount for goals master component')
    this.props.fetchGoals(this.props.user)
}

goalObjectCreation = ({name, amount, notes, endDate}) => {
    let goalData = {
        UserId: this.props.user,
        Amount:amount,
        Name: name,
        EndDate: endDate,
        Notes: notes,
       }
       return goalData
}

submitGoal = (goal) => {
    let goalData = this.goalObjectCreation(goal)
       console.log(goalData)
       this.props.addGoal(goalData)
    }

    updateGoalSubmited = (oldGoalInfo, newGoalInfo) => {
        console.log(oldGoalInfo)
        console.log(newGoalInfo)
    }

    render() {

        return (
            <div>
                <div className="add-goal-banner-div">Add Goal</div>
                <AddGoal submitGoal={this.submitGoal} />
                <GoalsIndividualGoalComponent updateGoalSubmited={this.updateGoalSubmited}/>
            </div>
        )


    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGoals: userId => dispatch(fetchGoals(userId)),
        addGoal: goalObject => dispatch(addGoal(goalObject))
    }

}

export default connect(null, mapDispatchToProps )(GoalsMasterComponent)