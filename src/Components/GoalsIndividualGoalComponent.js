import React from "react";
import { connect } from "react-redux";
import { fixDateDisplay } from "./HelperFunctions";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";


const now = moment();

class GoalsIndividualGoal extends React.Component {
  state = {
    goalId: 0,
    editGoalState: false,
    editGoalAmount: "",
    editGoalName: "",
    editGoalNotes: "",    
    endDate: now,
    error: false,
    calanderFocused: false,
    changedEndDate: false
  };

  editGoal = (e, goalData) => {
    console.log(goalData);
    this.setState({
      goalId: goalData.Id,
      editGoalState: true
    });
  };

  onFocusChange = ({ focused }) => {
    this.setState({
      calanderFocused: focused
    });
  };


  onDateChange = endDate => {
    this.setState({
      endDate: endDate
    });
  };

  editGoalAmount = e => {
    let amount = e.target.value;
    if (amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({
        editGoalAmount: amount
      });
    }
  };

  editGoalName = e => {
    let name = e.target.value;
    this.setState({
      editGoalName: name
    });
  };

  editGoalNotes = e => {
    let notes = e.target.value;
    this.setState({
      editGoalNotes: notes
    });
  };

  submitedUpdateGoal = (e, oldGoal) => {
    e.preventDefault();
    console.log(oldGoal)
    console.log(e)
    console.log(this.state)
    let newGoal = this.state
    this.props.updateGoalSubmited(oldGoal, newGoal);
    this.setState ({
      goalId: 0,
      editGoalState: false,
      editGoalAmount: "",
      editGoalName: "",
      editGoalNotes: "",    
      endDate: now,
      error: false,
      calanderFocused: false,
      changedEndDate: false
    });
  };



  individualGoals() {
    return this.props.goals.map(goal => {
      if (this.state.editGoalState == true) {
        if (this.state.goalId == goal.Id) {
          return (
            <React.Fragment>
              <div className="individual-goal-div" id="selected-edit-individual-goal">
                <form
                  className="edit-goal-form"
                  onSubmit={(e) => this.submitedUpdateGoal(e, goal)}
                >
                  <input
                    className="edit-goal-input"
                    type="text"
                    value={this.state.editGoalAmount}
                    onChange={this.editGoalAmount}
                    placeholder={goal.Amount}
                  />
                  <input
                    className="edit-goal-input"
                    type="text"
                    value={this.state.editGoalName}
                    onChange={this.editGoalName}
                    placeholder={goal.Name}
                  />
                  <input
                    className="edit-goal-input"
                    type="text"
                    value={this.state.editGoalNotes}
                    onChange={this.editGoalNotes}
                    placeholder={goal.Notes}
                  />
                <span className="span-edit-individual-goal-info">
                  {goal.isMomemnt == true
                    ? fixDateDisplay({ Date: goal.EndDate, isMoment: true })
                    : fixDateDisplay(goal.EndDate)}
                </span>
                <SingleDatePicker
                  date={this.state.createdAt}
                  onDateChange={this.onDateChange}
                  focused={this.state.calanderFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                  />
                <button >Update Goal</button>
                <button className="individual-goal-delete-button">
                  Delete
                </button>
                  </form>
              </div>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment>
              <div className="individual-goal-div">
                <span className="span-individual-goal-info">
                  ${goal.Amount}
                </span>
                <span className="span-individual-goal-info">{goal.Name}</span>
                <span className="span-individual-goal-info">{goal.Notes}</span>
                <span className="span-individual-goal-info">
                  {goal.isMomemnt == true
                    ? fixDateDisplay({ Date: goal.EndDate, isMoment: true })
                    : fixDateDisplay(goal.EndDate)}
                </span>
                <span className="span-individual-goal-info">
                  {goal.CreatedOn
                    ? fixDateDisplay(goal.CreatedOn)
                    : fixDateDisplay({ Date: moment(), isMoment: true })}
                </span>
                <button
                  className="individual-goal-edit-button"
                  onClick={e => this.editGoal(e, goal)}
                >
                  Edit
                </button>
                <button className="individual-goal-delete-button">
                  Delete
                </button>
              </div>
            </React.Fragment>
          );
        }
      } else {
        return (
          <React.Fragment>
            <div className="individual-goal-div">
              <span className="span-individual-goal-info">${goal.Amount}</span>
              <span className="span-individual-goal-info">{goal.Name}</span>
              <span className="span-individual-goal-info">{goal.Notes}</span>
              <span className="span-individual-goal-info">
                {goal.isMomemnt == true
                  ? fixDateDisplay({ Date: goal.EndDate, isMoment: true })
                  : fixDateDisplay(goal.EndDate)}
              </span>
              <span className="span-individual-goal-info">
                {goal.CreatedOn
                  ? fixDateDisplay(goal.CreatedOn)
                  : fixDateDisplay({ Date: moment(), isMoment: true })}
              </span>
              <button
                className="individual-goal-edit-button"
                onClick={e => this.editGoal(e, goal)}
              >
                Edit
              </button>
              <button className="individual-goal-delete-button">Delete</button>
            </div>
          </React.Fragment>
        );
      }
    });
  }
  render() {
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
