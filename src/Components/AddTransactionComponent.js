import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";

class AddTransaction extends Component {

    state = {
        transactionAmount: null
    }

    handleChange = (event) => {
        console.log(event.target)
        let htmlname = event.target.name
        let inputValue = event.target.value
        let numberDecimals;
        if (htmlname == "Amount" && inputValue)  {
            this.setState({
                transactionAmount: event.target.value
            })
            console.log(inputValue)
            if (inputstring) 
            var inputstring = inputValue.toString
            if (inputstring && inputstring.includes('.')) {

                numberDecimals = inputValue.toFixed(2)
            }
                if (numberDecimals) {
                    var lastTwoDecimals = numberDecimals.split('.')[1]
                        if (lastTwoDecimals && lastTwoDecimals.length == 2) {
                            console.log('hit two decimals')
                }

                }
        }
    }

    render() {
        return (
            <React.Fragment>
            <div id="addtransaction-form-main-wrapper-div">
                <form className="add-transaction-form">
                <div className="select-options-tranactions-wrapper-div">
                <select className="select-options-tranactions" onChange={this.handleChange}>
                <option value="Withdrawl">Withdrawl</option>
                <option value="Deposit">Deposit</option>
                </select>
                </div>
                    <label class="transaction-label">Amount</label>
                <input id="transaction-amount-input" value={this.state.transactionAmount} pattern="^\d+(?:\.\d{1,2})?$" placeholder="0.00" step=".01" type="number" name="Amount" min="0.01" onChange={this.handleChange}/>
                <br></br> 
                <label class="transaction-label">Notes</label>
                <input id="transaction-notes-input" type="text" label="Notes" min="0.01" onChange={this.handleChange}/>
                <br></br> 
                </form>
            </div>


            </React.Fragment>
        )
    }
}

export default connect(null, null)(AddTransaction)
