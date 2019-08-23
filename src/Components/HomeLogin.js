import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {connect} from 'react-redux';
import {deleteUser} from '../Store/Actions/UserAction'




class LogInHomePage extends Component {

  userLoggedOut = () => {
    firebase.auth().signOut()
    this.props.deleteUser()
  }

  render() {
    console.log(this.props.signedIn);
    return (
      <React.Fragment>
        <div>
          <ul className="navbar-ul-container-main">
            <li>
              <a className="active" href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="#news">Savings</a>
            </li>
            <li>
              <a href="#contact">Goals</a>
            </li>
            <li>
              <a href="#about">Personal Information</a>
            </li>
            <li>
            <a id="profile-signout-button" onClick={() => this.userLoggedOut()}>Log out</a>
            </li>
          </ul>
          <div className="loginhomepage-info-div" />
        </div>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user
 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: () => dispatch(deleteUser()) 
  }
}


export default (connect(mapStateToProps, mapDispatchToProps))(LogInHomePage);
