import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddTransaction from './AddTransactionComponent'


class TransactionMasterComponent extends Component {

    render() {
        return(
            <div>
                <AddTransaction />
                All Current Transactions

            </div>
        )
    }
}

export default connect(null, null)(TransactionMasterComponent)