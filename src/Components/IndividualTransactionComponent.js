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
                
                <tr className="transaction-table-rows">
                    <td className="transactions-span-per-value">${this.props.transaction.Amount}</td>
                    <td className="transactions-span-per-value">{this.props.transaction.Type}</td>
                    <td className="transactions-span-per-value">{this.props.transaction.Notes}</td>
                    <td className="transactions-span-per-value">{this.props.transaction.CreatedOn}</td>
                        </tr>

            </React.Fragment>
        )
    }
}

export default IndividualTransactionComponent;