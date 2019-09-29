import React, { Component } from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import { addTransactionToCurrent } from "../Store/Actions/TransactionActions";
import { checkIfAmountHasTwoDecimals } from "./HelperFunctions";
import IndividualTransactionComponent from "./IndividualTransactionComponent";
import CurrentTransactionsComponent from "./CurrentTransactionsComponent";
import { fetchGoals } from "../Store/Actions/GoalsActions";

class AddTransaction extends Component {
  state = {
    numOfDecimalsTwo: false,
    transactionAmount: "",
    transactionType: "Withdrawl",
    transactionNotes: null,
    goalId: null,
    goalName: "No goal"
  };

  handleChange = event => {
    let htmlname = event.target.name;
    let inputValue = event.target.value;
    let inputDecimals;
    let inputBeforeDecimals;
    if (inputValue == "") {
      // inputvalue is empty so need to change the state to make the input field blank
      this.setState({
        transactionAmount: null
      });
    }
    if (htmlname == "Amount" && inputValue) {
      if (this.state.numOfDecimalsTwo) {
        inputDecimals = inputValue
          .toString()
          .split(".")[1]
          .slice(0, 2);

        inputBeforeDecimals = inputValue.toString().split(".")[0];
        inputValue = parseFloat(inputBeforeDecimals + "." + inputDecimals);
      }

      console.log(inputValue);
      this.setState({
        transactionAmount: inputValue
      });

      if (checkIfAmountHasTwoDecimals(inputValue)) {
        this.setState({
          numOfDecimalsTwo: true
        });
      } else {
        this.setState({
          numOfDecimalsTwo: false
        });
      }
    }

    if (htmlname == "Notes") {
      this.setState({
        transactionNotes: event.target.value
      });
    }
    if (htmlname == "TransactionType") {
      this.setState({
        transactionType: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    let transactionInfo = {
      Amount: this.state.transactionAmount,
      Notes: this.state.transactionNotes,
      Type: this.state.transactionType,
      UserId: this.props.user.Id,
      GoalId: this.state.goalId
    };

    if (!checkIfAmountHasTwoDecimals(transactionInfo.Amount)) {
      transactionInfo["Amount"] += ".00";
    }
    console.log(event);
    console.log(this.state);
    this.submitTransactionToDataBase(transactionInfo, response => {
      console.log(response.result);
      if (response.result["Success"] == true) {
        console.log(`transaction was added to database `);
        let updateTransactionTable = {
          Amount: parseFloat(response.result.Amount),
          Type: response.result.TransactionType,
          Notes: response.result.Notes,
          CreatedOn: response.result.CreatedOn,
          GoalId: response.result.GoalId
        };
        this.props.addTransactionToCurrent(updateTransactionTable);
        this.setState({
          transactionNotes: "",
          transactionAmount: ""
        });
      }
    });
  };

  handleGoal = (e) => {
    this.setState({
      goalId: e.target.value
    })
  }

  submitTransactionToDataBase = (info, callback) => {
    console.log(info);
    let url = "http://localhost:5000/saveyourfuture/api/v1.0/AddTransaction";
    fetch(url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(info)
    })
      .then(response => response.json())
      .then(resp => callback(resp));
  };

  displayCurrentGoals = () => {
    console.log("we have goals!");
    let goalsArray = this.props.currentGoals;
    let userId = this.props.user.Id;

    console.log(goalsArray);
    return goalsArray.map(goal => {
      if (goal.UserId == userId) {
        console.log("goals for the user");
        return <option value={goal.Id}>{goal.Name}</option>;
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="addtransaction-form-main-wrapper-div">
          <form
            className="add-transaction-form"
            onSubmit={e => this.handleSubmit(e)}
          >
            <div className="select-options-tranactions-wrapper-div">
              <select
                className="select-options-tranactions"
                onChange={this.handleChange}
                name="TransactionType"
              >
                <option value="Withdrawl" data-type="negative">
                  Withdrawl
                </option>
                <option value="Deposit" data-type="positive">
                  Deposit
                </option>
              </select>
            </div>
            <label class="transaction-label">Amount</label>
            <input
              id="transaction-amount-input"
              value={this.state.transactionAmount}
              pattern="^\d+(?:\.\d{1,2})?$"
              placeholder="$0.00"
              step=".01"
              type="number"
              name="Amount"
              min="0.01"
              onChange={this.handleChange}
            />
            <br></br>
            <label class="transaction-label">Notes</label>
            <input
              value={this.state.transactionNotes}
              id="transaction-notes-input"
              type="text"
              min="0.01"
              onChange={this.handleChange}
              name="Notes"
            />
            <br></br>

            {this.props.currentGoals.length > 0 &&
            this.state.transactionType == "Deposit" ? (
              <select onChange={this.handleGoal} className="add-transaction-goal-select" >
                {this.displayCurrentGoals()}
              </select>
            ) : null}

            <input
              class="add-transaction-submit-button"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user.user,
    currentTransactions: state.transactions,
    currentGoals: state.goals.currentGoals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTransactionToCurrent: transInfo =>
      dispatch(addTransactionToCurrent(transInfo)),
    fetchGoals: userInfo => dispatch(fetchGoals(userInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransaction);
