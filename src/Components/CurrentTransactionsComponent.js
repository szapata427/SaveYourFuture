import React, { Component } from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import IndividualTransactionComponent from './IndividualTransactionComponent'
import { fetchUsersTransactions } from "../Store/Actions/TransactionActions";
import { filteredTransactions } from "../Store/Actions/TransactionActions";




class ShowCurrentTransactions extends Component {


    mapFetchTransactions = () => {
        console.log("map fetch transactions is hit")
        let lastDays = this.props.lastDays == "null" ? null : this.props.lastDays;
        let transactionsArrayFromProps = this.props.currentTransactions
        console.log(transactionsArrayFromProps)
        let date;
        let lastDaysDate
        let filteredDateTransactions 
        console.log(lastDays)

        if (lastDays != null) {
            date = new Date();
            lastDaysDate = date.setDate(date.getDate() - lastDays);
            filteredDateTransactions =  transactionsArrayFromProps.filter(trans => {


                if (Date.parse(trans.CreatedOn) >= lastDaysDate ) {
                    
                    if (trans.Amount !== "number") {
                        trans["Amount"] = parseFloat(trans.Amount)
                    }
                    
                    return trans


                }
            })
        }
            
            else {
                console.log('hit')
                filteredDateTransactions =  transactionsArrayFromProps.filter(trans => {
                if (trans.Amount !== "number") {
                    trans["Amount"] = parseFloat(trans.Amount)
                }
                
                return trans


            })

            }


        console.log(filteredDateTransactions)
        return filteredDateTransactions.map(trans =>{
            
             return <IndividualTransactionComponent key={trans.Id} transaction={trans}/>
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
          filteredTransactions: (filteredTrans) =>
          dispatch(filteredTransactions(filteredTrans))
          
        }

      };
      

export default connect(mapStateToProps, mapDispatchToProps)(ShowCurrentTransactions)