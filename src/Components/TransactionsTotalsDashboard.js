import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";


class TransactionsTotalsDashboard extends Component {
    



filteredTotalWithdrawlTranactions() {
    let withdrawlSum = 0
    let depositSum = 0
    let differentSum;
    let currentTansactionsArray = this.props.currentTransactions.currentTransactions
    currentTansactionsArray.forEach(trans => {
        if (trans.Type == 'Withdrawl') {
            withdrawlSum += trans.Amount
            
        }
        else if (trans.Type == 'Deposit') {
            depositSum += trans.Amount
        }
        
    })

    differentSum = depositSum - withdrawlSum
    return (
        <div className="total-amount-transactions-dashboard-wrapper">
            <div className="total-amount-dashboard">
            Total Withdrawl Sum ${withdrawlSum}
            </div>
            <div className="total-amount-dashboard"> 
                Total Deposit Sum ${depositSum}
            </div>
            <div className="total-amount-dashboard"> 
                {differentSum >= 0 ? "Profit" : "Loss"} ${differentSum}
            </div>
        </div>
    )

}

    render() {
        return (
            <React.Fragment>
                {this.props.currentTransactions ? this.filteredTotalWithdrawlTranactions() : null}
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
  return {
    currentTransactions: state.currentTransactions
  };
};

export default connect(mapStateToProps, null)(TransactionsTotalsDashboard)