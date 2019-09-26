import React from "react";
import { connect } from "react-redux";
import {fixDateDisplay} from './HelperFunctions'

class GoalsIndividualGoal extends React.Component {
  individualGoals() {
    return this.props.goals.map(goal => {
      return (
        <React.Fragment>
            <div className="individual-goal-div">
          <span className="span-individual-goal-info">${goal.Amount}</span>
          <span className="span-individual-goal-info">{goal.Name}</span>
          <span className="span-individual-goal-info">{goal.Notes}</span>
          <span className="span-individual-goal-info">{fixDateDisplay(goal.EndDate)}</span>
          <span className="span-individual-goal-info">{fixDateDisplay(goal.CreatedOn)}</span>

            </div>
        </React.Fragment>
      );
    });
  }
  render() {
    console.log(this.props.goals);
    return (
      <div>
        All my goals
        <div className="master-goals-container-div">
        {this.props.goals ? this.individualGoals() : null}

        </div>
      </div>
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
