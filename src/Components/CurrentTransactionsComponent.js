import React, { Component } from "react";

import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import IndividualTransactionComponent from './IndividualTransactionComponent'



class ShowCurrentTransactions extends Component {


    mapFetchTransactions = () => {
        console.log('hitmap function after adding transaction')
        console.log(this.props)
        let transactionsArrayFromProps = this.props.currentTransactions
        console.log(transactionsArrayFromProps)
        return transactionsArrayFromProps.map(trans => {

            return <IndividualTransactionComponent key={trans.Id} transaction={trans}/>

        })
        
    }

    transactionWasAdded() {


    }

    componentDidUpdate(prevProps) {
        console.log(prevProps)
        console.log(this.props)
    }

    render() {

        return(
            <React.Fragment>
                {this.props.currentTransactions ? this.mapFetchTransactions() : this.transactionWasAdded()}
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


export default connect(mapStateToProps, null)(ShowCurrentTransactions)