import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";


class IndividualTransactionComponent extends Component {


    render() {
        console.log(this.props.transaction)
        return(
            <React.Fragment>

            </React.Fragment>
        )
    }
}

export default IndividualTransactionComponent;