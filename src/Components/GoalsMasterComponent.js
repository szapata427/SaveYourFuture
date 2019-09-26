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

submitGoal = ({name, amount, notes, endDate}) => {
    console.log(endDate.format())
       let goalData = {
        UserId: this.props.user,
        Amount:amount,
        Name: name,
        EndDate: endDate,
        Notes: notes,
       }

       this.props.addGoal(goalData)
    }

    render() {

        return (
            <div>
                <div className="add-goal-banner-div">Add Goal</div>
                <AddGoal submitGoal={this.submitGoal}/>
                <GoalsIndividualGoalComponent />
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