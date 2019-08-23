import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { connect } from "react-redux";
import { deleteUser } from "../Store/Actions/UserAction";
import HomePageAccountMaster from "./HomePageAccountMasterComponent";
import {NavLink} from 'react-router-dom'


class LoginHomePageRoutes extends Component {
  userLoggedOut = () => {
    firebase.auth().signOut();
    this.props.deleteUser();
  };

  render() {
    console.log(this.props.signedIn);
    return (
      <React.Fragment>
        <div>
          <ul className="navbar-ul-container-main">
            <li>
              <a className="active" >
                <NavLink to="/AccountHome">
                Home
                </NavLink>
              </a>
            </li>
            <li>
              <a>
              <NavLink to="/Savings">
                Savings
                </NavLink>
                </a>
            </li>
            <li>
              <a>
                <NavLink to="/Goals">
                  Goals
                </NavLink>
              </a>
            </li>
            <li>
              <a>
                <NavLink to="/PersonInformation">
                Personal Information
                </NavLink>
              </a>
            </li>
            <li>
              <a>
                <NavLink to="/Transactions">
                  Transactions
                </NavLink>
              </a>
            </li>
            <li>
              <a
                id="profile-signout-button"
                onClick={() => this.userLoggedOut()}
              >
                Log out
              </a>
            </li>
          </ul>
          <div className="LoginHomePageRoutes-info-div" />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: () => dispatch(deleteUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginHomePageRoutes);

// <Route path="/AccountHome" component={HomePageAccountMaster}/>
