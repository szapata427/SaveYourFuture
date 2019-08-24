import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class ShowCurrentTransactions extends Component {


    render() {
        return(
            <div id="showcurrenttransactions-main-wrapper-div">
                All Current Transactions
            </div>
        )
    }
}

export default connect(null, null)(ShowCurrentTransactions)