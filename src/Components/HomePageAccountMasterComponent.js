import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {connect} from 'react-redux';
import TransactionsTotalsDashboard from './TransactionsTotalsDashboard'


class HomePageAccountMaster extends Component {
    

    render() {
        return (
            <div>
                <TransactionsTotalsDashboard />
            </div>
        )
    }
}

export default HomePageAccountMaster;