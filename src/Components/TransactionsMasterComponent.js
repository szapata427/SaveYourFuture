import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddTransaction from './AddTransactionComponent'
import ShowCurrentTransactions from './CurrentTransactionsComponent'
import {fetchUsersTransactions} from '../Store/Actions/TransactionActions'

export const url = "http://localhost:5000/"

class TransactionMasterComponent extends Component {



    componentWillReceiveProps(nextProps) {
        console.log(`current props ${this.props} and nextprops ${nextProps}`)
        if (this.props.user !== nextProps.user) {
            console.log(`props are different ${nextProps.user}`)
            this.props.fetchUsersTransactions(nextProps.user)
        }

    }



    render() {
        return(
            <React.Fragment>
                <AddTransaction />
                All Current Transactions
            
            <ShowCurrentTransactions />
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        currentTransactions: state.currentTransactions
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log(`hitting dispatch for all transactions`)
    return {
        fetchUsersTransactions: (userInfo) => dispatch(fetchUsersTransactions(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionMasterComponent)