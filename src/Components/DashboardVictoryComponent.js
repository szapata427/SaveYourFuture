import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import * as V from 'victory';
import {VictoryPie} from 'victory'



const DashboardVictoryComponent = (props) => {


const allTransactionsDashboardVictory= () => {
    let withdrawlSum = 0
    let depositSum = 0
    let differentSum;
    let lastDays = props.lastDays == "null" ? null : props.lastDays;
    let date;
    let lastDaysDate
    let currentTansactionsArray = props.currentTransactions.currentTransactions
    currentTansactionsArray.forEach(trans => {
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