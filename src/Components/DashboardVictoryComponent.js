import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import * as V from 'victory';
import {VictoryPie} from 'victory'



class DashboardVictoryComponent extends Component {


allTransactionsDashboardVictory() {
    console.log(this.props)

    let withdrawlSum = 0
    let depositSum = 0
    let differentSum;
    let currentTansactionsArray = this.props.currentTransactions.currentTransactions
    currentTansactionsArray.forEach(trans => {

        if (trans.Amount !== "number") {
            trans["Amount"] = parseFloat(trans.Amount)
        }

        if (trans.Type == 'Withdrawl') {
            withdrawlSum += trans.Amount
            
        }
        else if (trans.Type == 'Deposit') {
            depositSum += trans.Amount
        }
        
    })
    let profitOrLoss = differentSum >= 0 ? "Profit" : "Loss"
    const dataToGraph = [{x: "Withdrawl", y: withdrawlSum},{x: "Deposit", y: depositSum}]
    return dataToGraph
}
    render() {
        return (
            <React.Fragment>
                <div className="victory-pie-main-div-wrapper">
               {this.props.currentTransactions ? <VictoryPie data={this.allTransactionsDashboardVictory()} height={150}  colorScale={["red", "green" ]}     style={{
                   labels: {
                       fontSize: 8, fill: "blue"
                    }
                }}/>: null} 
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
      currentTransactions: state.currentTransactions
    };
  };

export default connect(mapStateToProps, null)(DashboardVictoryComponent)