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

  onNameChange = (e) => {
    this.setState({
        name: e.target.value
    })
  }

  onDateChange = (endDate) => {
      this.setState({
          endDate: endDate
      })
  }

  onAmountChange = (e) => {
const amount = e.target.value
if (amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
    this.setState({
        amount: amount
    })
}
  }

  onNotesChange = (e) => {
    const noteText = e.target.value 
    this.setState({
        notes: noteText
    })
  }
  
onSubmit = (e) => {
e.preventDefault()
this.props.submitGoal(this.state)


}
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <br></br>
          <input
            type="text"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <br></br>
          <input
            type="text"
            value={this.state.notes}
            onChange={this.onNotesChange}
          />
          <br></br>
        <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calanderFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <br></br>
        <button>Submit Goal!</button>
        </form>
      </div>
    );
  }
}

export default AddGoal;
