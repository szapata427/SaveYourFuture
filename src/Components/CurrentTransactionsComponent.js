import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import IndividualTransactionComponent from './IndividualTransactionComponent'
import { fetchUsersTransactions } from "../Store/Actions/TransactionActions";
import { filteredTransactions } from "../Store/Actions/TransactionActions";

class ShowCurrentTransactions extends Component {

    mapFetchTransactions = () => {
        let lastDays = this.props.lastDays == "null" ? null : this.props.lastDays;
        let transactionsArrayFromProps = this.props.currentTransactions
        let date;
        let lastDaysDate
        let filteredDateTransactions 


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
                filteredDateTransactions =  transactionsArrayFromProps.filter(trans => {
                if (trans.Amount !== "number") {
                    trans["Amount"] = parseFloat(trans.Amount)
                }
                return trans
            })

            }

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
            currentTransactions: state.currentTransactions.currentTransactions,
            currentGoals: state.goals
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