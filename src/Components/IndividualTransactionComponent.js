import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import { checkIfAmountHasTwoDecimals } from "./HelperFunctions";

class IndividualTransactionComponent extends Component {
    render() {
        let transtype = this.props.transaction.Type

    return (
      <React.Fragment>
        <div className="transaction-table-rows" transtype={transtype}> 
          <span className="transactions-span-per-value" >
            $
            {checkIfAmountHasTwoDecimals(this.props.transaction.Amount)
              ? this.props.transaction.Amount
              : this.props.transaction.Amount + ".00"}
          </span>
          <span className="transactions-span-per-value" >
            {this.props.transaction.Type}
          </span>
          <span className="transactions-span-per-value">
            {this.props.transaction.Notes}
          </span>
          <span className="transactions-span-per-value">
            {this.props.transaction.CreatedOn}
          </span>
          </div>
      </React.Fragment>
    );
  }
}

export default IndividualTransactionComponent;
