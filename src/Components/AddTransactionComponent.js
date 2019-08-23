import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class AddTransaction extends Component {


    render() {
        return (
            <React.Fragment>
            <div>
                <form>
                    <label>Amount</label>
                <input type="text"/> 

                </form>
            </div>

            </React.Fragment>
        )
    }
}

export default connect(null, null)(AddTransaction)