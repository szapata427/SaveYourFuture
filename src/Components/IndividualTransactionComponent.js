import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";


class IndividualTransactionComponent extends Component {


    render() {
        console.log(this.props.transaction)
        return(
            <React.Fragment>
                
                    <div className="indiviudal-transaction-container">
                    <tr className="transactions-span-per-value">{this.props.transaction.Amount}</tr>
                    <tr className="transactions-span-per-value">{this.props.transaction.Type}</tr>
                    <tr className="transactions-span-per-value">{this.props.transaction.Notes}</tr>
                    <tr className="transactions-span-per-value">{this.props.transaction.CreatedOn}</tr>
                    </div>

            </React.Fragment>
        )
    }
}

export default IndividualTransactionComponent;