import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import * as V from 'victory';
import {VictoryPie} from 'victory'
import {totalAmountPerTransactionType} from './HelperFunctions'


const DashboardVictoryComponent = (props) => {


const allTransactionsDashboardVictory= () => {
    let differentSum;
    let lastDays = props.lastDays == "null" ? null : props.lastDays;

    let currentTansactionsArray = props.currentTransactions.currentTransactions
    let resultDepositWithdrawl = totalAmountPerTransactionType(currentTansactionsArray, lastDays)

    let withdrawlSum = resultDepositWithdrawl.WithdrawlSum
    let depositSum = resultDepositWithdrawl.DepositSum
    

    let profitOrLoss = differentSum >= 0 ? "Profit" : "Loss"
    const dataToGraph = [{x: "Withdrawl", y: withdrawlSum},{x: "Deposit", y: depositSum}]
    return dataToGraph
}

        return (
            <React.Fragment>
                <div className="victory-pie-main-div-wrapper">
               {props.currentTransactions ? <VictoryPie data={allTransactionsDashboardVictory()} height={150}  colorScale={["red", "hsl(120, 73%, 75%)" ]}     style={{
                   labels: {
                       fontSize: 6, fill: "blue"
                    }
                }}  labelPosition="centroid"/>: null} 
                </div>
            </React.Fragment>
        )
}


const mapStateToProps = state => {
    return {
      currentTransactions: state.currentTransactions
    };
  };

export default connect(mapStateToProps, null)(DashboardVictoryComponent)