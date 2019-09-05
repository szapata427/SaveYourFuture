import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";


class TransactionsAmountTotalWithdrawl extends Component {
    



filteredTotalWithdrawlTranactions() {
    let sum = 0
    let currentTansactionsArray = this.props.currentTransactions.currentTransactions
    currentTansactionsArray.forEach(trans => {
        if (trans.Type == 'Withdrawl') {
            sum += trans.Amount
            
        }
        
    })
    return (
        <div>
            {sum}
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

export default connect(mapStateToProps, null)(TransactionsAmountTotalWithdrawl)