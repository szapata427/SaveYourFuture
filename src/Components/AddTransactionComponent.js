import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";

class AddTransaction extends Component {
  state = {
    numOfDecimalsTwo: false,
    transactionAmount: "",
    transactionType: "Withdrawl",
    transactionNotes: null,

  };

  handleChange = event => {
    console.log(event.target.value);
    let htmlname = event.target.name;
    console.log(htmlname)
    let inputValue = event.target.value;
    let numberDecimals;
    let inputstring;
    let inputDecimals;
    let inputBeforeDecimals;
    let hasDecimals;
    if (inputValue == "") {
        // inputvalue is empty so need to change the state to make the input field blank
        this.setState({
            transactionAmount: null
        })
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

      this.setState({
        transactionAmount: inputValue
      });

      if (this.checkIfAmountHasTwoDecimals(inputValue)) {
          this.setState({
            numOfDecimalsTwo: true,

          })
      }

      else {
        this.setState({
            numOfDecimalsTwo: false,

          })
      }
    }

    if (htmlname == "Notes") {
        this.setState({
            transactionNotes: event.target.value
        })
    }
    if (htmlname == "TransactionType") {
        this.setState({
            transactionType: event.target.value
        })
    }

  };


  handleSubmit = (event) => {
    event.preventDefault()
    let transactionInfo = {
        Amount: this.state.transactionAmount,
        Notes: this.state.transactionNotes,
        Type: this.state.transactionType,
        UserId: this.props.user.Id
    }

    if (!this.checkIfAmountHasTwoDecimals(transactionInfo.Amount)) {
        transactionInfo["Amount"] += ".00"
        
    }
      console.log(event)
      console.log(this.state)
      this.submitTransactionToDataBase(transactionInfo, (response) => {
          console.log(response.result)
          if (response.result["Success"] == true) {
              console.log(`transaction was added`)
          }
      })
  }

  submitTransactionToDataBase = (info, callback) => {
      console.log(info)
      let url = 'http://localhost:5000/saveyourfuture/api/v1.0/AddTransaction'
      fetch(url, {
          method: "Post",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
          },
          body: JSON.stringify(info)

      }).then(response => response.json())
      .then(resp => callback(resp))

  }



  render() {
    return (
      <React.Fragment>
        <div id="addtransaction-form-main-wrapper-div">
          <form className="add-transaction-form" onSubmit={(e) => this.handleSubmit(e)}>
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
              placeholder="0.00"
              step=".01"
              type="number"
              name="Amount"
              min="0.01"
              onChange={this.handleChange}
            />
            <br></br>
            <label class="transaction-label">Notes</label>
            <input
              id="transaction-notes-input"
              type="text"
              min="0.01"
              onChange={this.handleChange}
              name="Notes"
            />
            <br></br>
            <input class="add-transaction-submit-button" type="submit" value='Submit'/>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
    console.log(state);
    return {
      user: state.user.user
    };
  };

export default connect(
    mapStateToProps,
  null
)(AddTransaction);
