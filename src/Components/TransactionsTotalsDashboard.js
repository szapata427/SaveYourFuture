import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import {twoDecimalsNumber} from './HelperFunctions'
import {checkIfAmountHasTwoDecimals} from './HelperFunctions'
import DashboardVictoryComponent from './DashboardVictoryComponent'


class TransactionsTotalsDashboard extends Component {
    
filteredTotalWithdrawlTranactions() {
    console.log(this.props)
    let withdrawlSum = 0
    let depositSum = 0
    let differentSum;
    let currentTansactionsArray = this.props.currentTransactions.currentTransactions
    let lastDays = this.props.lastDays == "null" ? null : this.props.lastDays;
    let date;
    let lastDaysDate

    currentTansactionsArray.filter(trans => {
        if (lastDays != null) {
            date = new Date();
            lastDaysDate = date.setDate(date.getDate() - lastDays);
            
            if (Date.parse(trans.CreatedOn) >= lastDaysDate ) {

            if (trans.Amount !== "number") {
                trans["Amount"] = parseFloat(trans.Amount)
            }
            
            if (trans.Type == 'Withdrawl') {
                withdrawlSum += trans.Amount
                
            }
            else if (trans.Type == 'Deposit') {
                depositSum += trans.Amount
            }
            
        }
    }

    else {
        if (trans.Amount !== "number") {
            trans["Amount"] = parseFloat(trans.Amount)
        }
        
        if (trans.Type == 'Withdrawl') {
            withdrawlSum += trans.Amount
            
        }
        else if (trans.Type == 'Deposit') {
            depositSum += trans.Amount
        }
        
    }


    })
    withdrawlSum = checkIfAmountHasTwoDecimals(withdrawlSum) ? withdrawlSum : twoDecimalsNumber(withdrawlSum)
    depositSum = checkIfAmountHasTwoDecimals(depositSum) ? depositSum : twoDecimalsNumber(depositSum)
    differentSum = checkIfAmountHasTwoDecimals(depositSum - withdrawlSum) ? depositSum - withdrawlSum : twoDecimalsNumber(depositSum - withdrawlSum)

    
    withdrawlSum = withdrawlSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    depositSum = depositSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    differentSum = differentSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   
    return (
        <React.Fragment>

        <div className="total-accounting-dashboard-div"> Dashboard</div>
        <div className="total-amount-transactions-dashboard-wrapper">
            <div className="total-amount-dashboard" transtype="deposit"> 
                Deposit ${depositSum}
            </div>
            <div className="total-amount-dashboard" transtype="withdrawl">
             Withdrawl ${withdrawlSum}
            </div>
            <div className="total-amount-dashboard" transtype={parseFloat(differentSum) >= 0 ? "deposit" : "withdrawl"}> 
                {parseFloat(differentSum) >= 0 ? "Profit" : "Loss"} ${differentSum}
            </div>
        </div>
        </React.Fragment>
    )

}

    render() {
        return (
            <React.Fragment>
                {this.props.currentTransactions ? this.filteredTotalWithdrawlTranactions() : null}
                <DashboardVictoryComponent />
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