import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class AddTransaction extends Component {

    state = {
        transactionAmount: 0
    }

    handleChange = (event) => {
        console.log(event.target.value)
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
                <input id="transaction-amount-input" type="number" label="Amount" min="0.01" onChange={this.handleChange}/>
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
