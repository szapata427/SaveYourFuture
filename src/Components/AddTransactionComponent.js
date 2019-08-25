import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";

class AddTransaction extends Component {

    state = {
        transactionAmount: null,
        numOfDecimalsTwo: false
    }

    handleChange = (event) => {
        console.log(event.target)
        let htmlname = event.target.name
        let inputValue = event.target.value
        let numberDecimals;
        let inputstring;
        var inputDecimals;
        let inputBeforeDecimals;

        if (htmlname == "Amount" && inputValue)  {
            if (this.state.numOfDecimalsTwo) {
                inputDecimals = inputValue.toString().split('.')[1].slice(0,2)
                inputBeforeDecimals = inputValue.toString().split('.')[0]
                inputValue = parseFloat(inputBeforeDecimals + '.' + inputDecimals)
            }
            this.setState({
                transactionAmount: inputValue
            })
            console.log(inputValue)
            inputValue = parseFloat(inputValue)
             inputstring = inputValue.toString()
            var hasDecimals = inputstring.indexOf('.')
            console.log(hasDecimals)
            if (hasDecimals != -1) {
                    var lastTwoDecimals = inputstring.split('.')[1]
                        if (lastTwoDecimals.length === 2) {
                            console.log('hit two decimals', lastTwoDecimals)
                            this.setState({
                                numOfDecimalsTwo: true
                            })
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
                <input id="transaction-amount-input" value={this.state.transactionAmount} pattern="^\d+(?:\.\d{1,2})?$" placeholder="0.00" 
                step=".01" type="number" name="Amount" min="0.01" onChange={this.handleChange}/>
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
