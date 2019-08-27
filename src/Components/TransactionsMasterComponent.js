import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddTransaction from './AddTransactionComponent'

const url = "http://localhost:5000/"

class TransactionMasterComponent extends Component {


    componentDidUpdate(prevProps) {
    console.log(this.props)
    if (this.props.user) {
        fetch(`${url}/saveyourfuture/api/v1.0/UsersTransactions?UserId=${this.props.user.Id}`)
        .then(response => response.json())
        .then(data => console.log(data))
    }

    }

    render() {
        console.log(this.props)
        return(
            <React.Fragment>
                <AddTransaction />
                All Current Transactions

            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(TransactionMasterComponent)