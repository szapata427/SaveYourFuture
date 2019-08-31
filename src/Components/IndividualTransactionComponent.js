import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import { checkIfAmountHasTwoDecimals } from "./HelperFunctions";

class IndividualTransactionComponent extends Component {
  render() {
    console.log(this.props.transaction);
    return (
      <React.Fragment>
        <tr className="transaction-table-rows">
          <td className="transactions-span-per-value">
            $
            {checkIfAmountHasTwoDecimals(this.props.transaction.Amount)
              ? this.props.transaction.Amount
              : this.props.transaction.Amount + ".00"}
          </td>
          <td className="transactions-span-per-value">
            {this.props.transaction.Type}
          </td>
          <td className="transactions-span-per-value">
            {this.props.transaction.Notes}
          </td>
          <td className="transactions-span-per-value">
            {this.props.transaction.CreatedOn}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default IndividualTransactionComponent;
