import React, { Component } from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import IndividualTransactionComponent from './IndividualTransactionComponent'
import { fetchUsersTransactions } from "../Store/Actions/TransactionActions";




class ShowCurrentTransactions extends Component {


    mapFetchTransactions = () => {
        let lastDays = this.props.lastDays
        let transactionsArrayFromProps = this.props.currentTransactions
        console.log(transactionsArrayFromProps)
        let date = new Date();
        let lastDaysDate = date.setDate(date.getDate() - lastDays);
        return transactionsArrayFromProps.map(trans => {
            
            if (lastDays !== null) {
                
                if (Date.parse(trans.CreatedOn) >= lastDaysDate ) {
                    
                    if (trans.Amount !== "number") {
                        trans["Amount"] = parseFloat(trans.Amount)
                    }
                    
                    
                    return <IndividualTransactionComponent key={trans.Id} transaction={trans}/>


                }
                
            }
            else {
                if (trans.Amount !== "number") {
                    trans["Amount"] = parseFloat(trans.Amount)
                }
                
                
                return <IndividualTransactionComponent key={trans.Id} transaction={trans}/>



            }
        })
        
    }


    render() {

        return(
            <React.Fragment>
                
                {this.props.currentTransactions ? this.mapFetchTransactions() : null}
            </React.Fragment>
        )
    }
}




const mapStateToProps = (state) => {
    console.log(state, 'in currentransactions')

        return {
            currentTransactions: state.currentTransactions.currentTransactions
        }
        
    }

    const mapDispatchToProps = dispatch => {
        console.log(`hitting dispatch for all transactions`);
        return {
          fetchUsersTransactions: (userInfo, days) =>
            dispatch(fetchUsersTransactions(userInfo, days))
        };
      };
      

export default connect(mapStateToProps, mapDispatchToProps)(ShowCurrentTransactions)