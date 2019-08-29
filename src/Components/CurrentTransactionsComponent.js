import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";
import IndividualTransactionComponent from './IndividualTransactionComponent'



class ShowCurrentTransactions extends Component {


    mapFetchTransactions = () => {
        let transactionsArrayFromProps = this.props.currentTransactions.result
        return transactionsArrayFromProps.map(trans => {
            console.log(trans)
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

    return {
        currentTransactions: state.transactions.currentTransactions
    }

}
export default connect(mapStateToProps, null)(ShowCurrentTransactions)