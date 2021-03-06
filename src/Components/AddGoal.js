import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

const now = moment();
class AddGoal extends React.Component {
  state = {
    name: "",
    amount: "",
    notes: "",
    endDate: now,
    error: false,
    calanderFocused: false
  };

  onFocusChange = ({ focused }) => {
    this.setState({
      calanderFocused: focused
    });
  };

  onNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  onDateChange = endDate => {
    this.setState({
      endDate: endDate
    });
  };

  onAmountChange = e => {
    const amount = e.target.value;
    if (amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({
        amount: amount
      });
    }
  };

  onNotesChange = e => {
    const noteText = e.target.value;
    this.setState({
      notes: noteText
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.submitGoal(this.state);
    this.setState({
        name: "",
        amount: "",
        notes: "",
        endDate: now,
        error: false,
        calanderFocused: false
    })
  };


  render() {
    return (
      <div className="add-goal-main-div-wrapper">
        <div>
          <form onSubmit={this.onSubmit} className="add-goal-form">
            <div className="goal-label-div-main-wrapper">
            <div className="add-goal-labels-div-individual">

            <label  className="goal-label">Name</label>
            <input className="add-goal-input"
              type="text"
              value={this.state.name}
              onChange={this.onNameChange}
              />
              </div>
            <br></br>
            <div className="add-goal-labels-div-individual">
            <label  className="goal-label" >Amount</label>
            <input className="add-goal-input"
              type="text"
              value={this.state.amount}
              onChange={this.onAmountChange}
            />
           </div>

            <br></br>
            <div className="add-goal-labels-div-individual">
            <label  className="goal-label" >Notes</label>
            <input className="add-goal-input"
              type="text"
              value={this.state.notes}
              onChange={this.onNotesChange}
            />
            </div>

            <br></br>
            <div className="main-date-deadline-wrapper">
            <div className="add-goal-labels-div-individual" id="goal-deadline-date-div">
            <label  id="goal-label-deadline-date" className="goal-label" >DeadLine Date</label>
            </div>
            <div className="add-goal-labels-div-individual" id="goal-datepicker-id">
            <SingleDatePicker 
              date={this.state.createdAt}
              onDateChange={this.onDateChange}
              focused={this.state.calanderFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
            />
                                    </div>

            </div>

            <br></br>
            <button className="submit-goal-button"><span>Submit!</span></button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddGoal;
