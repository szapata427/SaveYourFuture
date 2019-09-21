import React from 'react'
import {connect} from 'react-redux'


class GoalsIndividualGoal extends React.Component {


    individualGoals() {
         return this.props.goals.map(goal => {
            return <React.Fragment><div>{goal.Amount}</div>
                <div>{goal.Name}</div></React.Fragment>
        })
    }
    render() {
        console.log(this.props.goals)
        return(
            <div>
                All my goals
                {this.props.goals ? this.individualGoals(): null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        goals: state.goals.currentGoals
    }
}

export default connect(mapStateToProps, null)(GoalsIndividualGoal)