import React from "react";
import { connect } from "react-redux";
import {fixDateDisplay} from './HelperFunctions'
import moment from 'moment'

class GoalsIndividualGoal extends React.Component {
  individualGoals() {
    return this.props.goals.map(goal => {
      return (
        <React.Fragment>
            <div className="individual-goal-div">
          <span className="span-individual-goal-info">${goal.Amount}</span>
          <span className="span-individual-goal-info">{goal.Name}</span>
          <span className="span-individual-goal-info">{goal.Notes}</span>
          <span className="span-individual-goal-info">{goal.isMomemnt == true ? fixDateDisplay({Date: goal.EndDate, isMoment: true}) : fixDateDisplay(goal.EndDate)}</span>
          <span className="span-individual-goal-info">{goal.CreatedOn ? fixDateDisplay(goal.CreatedOn): fixDateDisplay({Date: moment(), isMoment: true})}</span>

            </div>
        </React.Fragment>
      );
    });
  }
  render() {
    console.log(this.props.goals);
    return (
        <React.Fragment>
      <div className="all-my-goals-title-banner">
        <span className="span-my-goals">My Goals</span>
        </div>
        <div className="master-goals-container-div">
        {this.props.goals ? this.individualGoals() : null}
    </div>

        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    goals: state.goals.currentGoals
  };
};

export default connect(
  mapStateToProps,
  null
)(GoalsIndividualGoal);
