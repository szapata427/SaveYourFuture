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
            <div id="addtransaction-form-main-wrapper">
                <form>
                    <label>Amount</label>
                <input type="number" label="Amount" min="0.01" onChange={this.handleChange}/>
                <br></br> 
                <label>Notes</label>
                <input type="text" label="Notes" min="0.01" onChange={this.handleChange}/>
                <br></br> 
                <select class="select-options-tranactions" onChange={this.handleChange}>
                <option value="Withdrawl">Withdrawl</option>
                <option value="Deposit">Deposit</option>
                </select>

                </form>
            </div>

            </React.Fragment>
        )
    }
}

export default connect(null, null)(AddTransaction)