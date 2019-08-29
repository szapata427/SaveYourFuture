import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { number } from "prop-types";



class ShowCurrentTransactions extends Component {
    render() {
        console.log(this.props) 
        return(
            <React.Fragment>

            </React.Fragment>
        )
    }
}




const mapStateToProps = (state) => {
    console.log(state)
    return {
        currentTransactions: state
    }

}
export default connect(mapStateToProps, null)(ShowCurrentTransactions)